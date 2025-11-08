---
title: Notes sur l'utilisation du Messenger de Symfony
description: Comment traiter des tâches asynchrones
created_at: 2025-11-08
templateEngineOverride: md
---

Depuis quelques mois, je (re)travaille avec Symfony. Ma dernière expérience avec ce framework remonte à plus de 10 ans. Plutôt habitué à Laravel, je dois donc réapprendre certaines façons de faire. J'ai regroupé mes prises de notes afin de garder une trace et qu'elles puissent être, peut-être, utiles à d'autres.{.info}

Récemment, j'ai du implémenter un traitement de tâche asynchrone. Avec Laravel, j'aurais utilisé le système de queues. Symfony a une solution: [Messenger](https://symfony.com/doc/current/messenger.html).

Messenger permet d'échanger des informations entre composants de l'app.

## Comment ça marche ?

### Les Messages

La logique est la suivante: on dispatch un message avec (ou non) des paramètres. Le message est ensuite traité par un handler.

Le message est une classe PHP toute simple. on le marque comme étant un message via l'annotation `#[AsMessage()]`

Un exemple de message

```php
<?php
...

#[AsMessage('async')]
class MonMessage
{
	public function __construct(
		private readonly int $userId,

	) {
	}

	public function getUserId(): int
	{
		return $this->userId;
	}
}
```

Les propriétés qu'on lui passe sont les éléments nécessaires au traitement de la tâche que l'on souhaite accomplir.

Une autre classe sera utilisée pour le traitement, il s'agit d'un MessageHandler. Ici aussi, on utilise une annotation pour déclarer notre classe comme un MessageHandler avec `#[AsMessageHandler]`

Exemple de MessageHandler:

```php
<?php
...
#[AsMessageHandler]
readonly class MonMessageHandler
{
	...

	public function __invoke(MonMessage $message): void
	{
		$report = $this->userRepository->find($message->getUserId());
	}

}
```

La classe reçoit automatiquement le message en paramètre. À partir de là, on peut utiliser un repository pour aller chercher les données que l'on souhaite.

Dispatcher ensuite un message ressemble à ça:

```php
$this->messageBus->dispatch($myMessage);
```

(oui, il faut utiliser le service de Symfony `MessageBusInterface`)

### Les transports

Lorsque l'on défini un message, on l'associe à un transport (via l'annotation `#[AsMessage(nomDuTransport)]`. Ces transports sont définis dans la config et peuvent porter n'importe quel nom. On associe un transport à une système de file d'attente. Cette association se fait dans le fichier de config `config/packages/messenger.yaml`.

```yaml
framework:
	messenger:
		transports:
			async: '%env(MESSENGER_TRANSPORT_DSN)%'
```

Il est possible d'avoir plusieurs transports. Dans ce cas, on peut spécifier directement dans le message par quel transport doit être passé le message grâce à l'annotation `#[AsMessage('async')]`.

Attention aux paramètres de Message ! Un transport peut être asynchrone. Dans ce cas, le message est stocké et pour ce faire, est sérialisé. Il est recommandé de n'utiliser que des ID et de ne pas passer des entités entières. Voir [la doc](https://symfony.com/doc/current/messenger.html#doctrine-entities-in-messages) à ce sujet

Ensuite, un worker qui viendra traiter les handler les uns après les autres en fonction de leur arrivée dans la file d'attente.

### Le worker

Le worker est lancé via une commande dans laquelle on lui spécifie les transports que l'on souhaite traiter.

```bash
php bin/console messenger:consume async -vv
```

## Quelques points d'attention

### Contexte d’exécution

Lorsque les tâches sont traitées de manière asynchrone, c'est donc le worker qui les exécutent. Le worker traite tous les messages en continu, dans le même fil d'éxécution. Si un handler vient modifier un paramètre global, tous les handlers qui seront ensuite exécutés hériteront de ce changement.

Le worker n'ayant pas le contexte d'une requête, on ne peut donc pas trouver l'utilisateur en cours, ce qui peut poser plusieurs problème. Par exemple, la locale sera celle par défaut et pas celle de l'utilisateur.
Dans ce cas précis, on peut contourner ce problème avec le service LocalSwitcher et la méthode setLocale.
Par exemple en récupérant l'utilisateur, en passant sur sa locale avant de traiter la tâche, puis en repassant à la locale par défaut à la fin de celle ci.

Exemple:

```php
<?php
...
#[AsMessageHandler]
readonly class MonMessageHandler
{
	...

	public function __invoke(MonMessage $message): void
	{
		$user = $this->userRepository->find($message->getUserId());
		$default = $this->localeSwitcher->getLocale();
		$this->localeSwitcher->setLocale($user->getLocale());
		// Business logic
		// ...
		$this->localeSwitcher->setLocale($default);
	}
}
```

Il est important de bien remettre la locale par défaut pour que les tâches suivantes n'héritent pas de ces changements.

### Debug en local

Pour faciliter le debug, on peut défini une file d'attente synchrone pour notre transport async. Dans le .env.local, il suffit d'insérer cette ligne

```
MESSENGER_TRANSPORT_DSN='sync://'
```

Ainsi, tous les messages du transports async seront traités de manière synchrone, et donc dans le thread de notre requête, ce qui permet d'avoir dans le profiler, mais aussi dans la console, les dump que l'on souhaite.

## Quelle différence avec le Scheduler ?

Tous deux traitent des tâches de manière asynchrone, mais ils diffèrent dans leur utilisation.

Le scheduler est un moyen de programmer des tâches. On a donc un contrôle précis sur le moment où une tâche précise sera exécutée. Il se rapproche plus d'une tâche cron (sa syntaxe en est inspirée). Exemple d'application: un envoi hebdo d'une newsletter, un ping de services toutes les 5 minutes, etc.

Avec Messenger, on n'a pas de contrôle sur le moment précis de l’exécution d'une tâche. Celle ci sera effectuée lorsque son tour arrivera

Exemple d'application: traitement en arrière plan d'une tâche complexe comme l'export de rapport climat :), envoi d'email de réinitialisation de mot de passe, etc.

## Quelle différence avec les EventDispatcher ?

Les deux ont le même but: informer d'autres parties de l'app de quelque chose. Messenger se démarque de l'EventDispatcher par sa possibilité d'être asynchrone. De même, les tâches de Messenger peuvent échouer et être relancées, à l'inverse des Listeners ou Subscribers.

## Liens utiles

- [Doc de Symfony de Messenger](https://symfony.com/doc/current/messenger.html)
- [Doc de Symfony de Scheduler](https://symfony.com/doc/current/scheduler.html)
- [Doc Symfony de EventDispatcher](https://symfony.com/doc/current/components/event_dispatcher.html)
