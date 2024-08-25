# Custom Levels

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/foskym/flarum-custom-levels.svg)](https://packagist.org/packages/foskym/flarum-custom-levels) [![Total Downloads](https://img.shields.io/packagist/dt/foskym/flarum-custom-levels.svg)](https://packagist.org/packages/foskym/flarum-custom-levels)

A [Flarum](http://flarum.org) extension. Flarum Custom Levels. Custom calculation formulas can be set.

## Usage
### set the display format & formula of level/exp
![image](https://github.com/user-attachments/assets/f26b7ab3-f857-4af8-896b-23f6c9344081)

##### Nonlinear
![image](https://github.com/user-attachments/assets/c51bbd3e-709c-48cc-8164-94941b5625fd)

##### Average
![image](https://github.com/user-attachments/assets/9af99bf2-556a-4dc7-a0ea-43ed037d991c)

### it's an example
![Snipaste_2023-09-28_12-19-05](https://github.com/FoskyM/flarum-custom-levels/assets/39661663/38b14508-1900-48b5-aee5-6e7c2868091b)

### Variables Support
- core
   - [discussionCount]
   - [commntCount]
- antoinefr-money
   - [money]
- clarkwinkelmann-likes-received
   - [likesReceived]
- fof-best-answer
   - [bestAnswerCount]

### Calculation Support
- Support for +, -, *, /, % and power (^) operators
- Logical operators (==, !=, <, <, >=, <=, &&, ||, !)
- Support for most PHP math functions
- Support for BCMath Arbitrary Precision Math
- Conditional If logic
- Unary Plus and Minus (e.g. +3 or -sin(12))
- Pi ($pi) and Euler's number ($e) support to 11 decimal places

For more, please see [MathExecutor](https://github.com/neonxp/MathExecutor)

## Installation

Install with composer:

```sh
composer require foskym/flarum-custom-levels:"*"
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
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
