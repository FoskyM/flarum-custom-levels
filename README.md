# Custom Levels

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/foskym/flarum-custom-levels.svg)](https://packagist.org/packages/foskym/flarum-custom-levels) [![Total Downloads](https://img.shields.io/packagist/dt/foskym/flarum-custom-levels.svg)](https://packagist.org/packages/foskym/flarum-custom-levels)

A [Flarum](http://flarum.org) extension. Flarum Custom Levels, levels can be customized, and can trigger events.

## Better combinations
- this.
- `xypp/forum-quests`. Forum Quests, reward exp.
- `fof/user-directory`. User Directory, sort by exp.
   - `foskym/flarum-better-user-directory`. Leaderboard podium style for user directory.
- `v17development/flarum-user-badges`. User Badges.
- `xypp/flarum-websocket-notification`. Realtime Notification.
- `askvortsov/flarum-auto-moderator`. Auto assign badges or other action when exp updated.

## Usage
### set the levels
![image](https://github.com/user-attachments/assets/dfdeeb12-8555-428e-9702-266b58fa3f92)

### if you've installed `xypp/forum-quests` ever and quests done, you can run this command
`php flarum foskym:custom-levels:refresh-quest`

### or you should set the reward exp, then run this command 
`php flarum foskym:custom-levels:refresh`

### set the display format
![image](https://github.com/user-attachments/assets/3ea0fee3-b852-4390-bf22-b6c0b97795d3)

### you can see the exp logs
![image](https://github.com/user-attachments/assets/9c718859-05d5-42a7-bba1-eb68f377e6e6)

### Support
- [askvortsov/flarum-auto-moderator](https://github.com/askvortsov1/flarum-automod) Modify `exp` when triggering events
- [xypp/forum-quests](https://github.com/zxy19/flarum-forum-quests) Reward `exp` when completing tasks
- [xypp/store](https://github.com/zxy19/store) Purchase `exp` with `money` in Store
- [fof/user-directory](https://github.com/FriendsOfFlarum/user-directory) Sorting users by `exp`
- [nodeloc/flarum-ext-leaderboard](https://github.com/nodeloc/flarum-ext-leaderboard) Sorting users by `exp`

## Installation

Install with composer:

```sh
composer require foskym/flarum-custom-levels:"*"
```

## Command

```sh
php flarum foskym:custom-levels:detete-exp-logs  # Delete Exp Logs
php flarum foskym:custom-levels:refresh # Refresh Exp by settings
php flarum foskym:custom-levels:refresh-quest # Refresh Exp by Done quests
```

## Updating

```sh
composer update foskym/flarum-custom-levels:"*"
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/foskym/flarum-custom-levels)
- [GitHub](https://github.com/foskym/flarum-custom-levels)
- [Discuss](https://discuss.flarum.org/d/34761-custom-levels)
