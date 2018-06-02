# Getting started

__M-down__ is a command line tool which helps you to create documentations, descriptions, teaching materials using extendable markdown language.

Let's quickly go through the example below to get the idea, how can you use __M-down__.

## Prerequest

__M-down__ is written in [NodeJS](https://nodejs.org/en/). Make sure to install it before you proceed.

## Hello World!

Create an empty folder in your computer and open up a command line or bash.

__1.__ Create a new folder called `pages` where you will store the content for your site.

```bash
mkdir pages
```

__2.__ Install __m-down__.

```bash
npm -g install m-down
```

__3.__ Create your hello world page.


```bash
echo # Hello World! > pages/hello.md
```

__4.__ Configure the menu.


```bash
echo [{ "link": "/hello", "name": "Hello World" }] > menu.json
```

__5.__ And generate your site!

```bash
m-down
```

### Congratulation!

Now you can serve your content to the public via [GitHub Pages](https://pages.github.com/) or just try it locally using the `static-server` npm package.

```bash
npm -g install static-server
```

```bash
cd dist/

static-server -p 8080
```

And you did it! [Here](http://localhost:8080) you go! :)
