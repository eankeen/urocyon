# Urocyon

## Introduction

Named after a [genus of Western Hemisphere foxes](https://en.wikipedia.org/wiki/Urocyon), Urocyon is an intuitive and opinionated scaffolding system for your apps. Right now, it doesn't even do anything because it's not done.

## Terminology

A *recipe* contains instructions on how to scaffold a thing. Recipes can have flavors. Just like a cake recipe can come in vanilla, chocolate, strawberry flavor, this kind of recipe can scaffold a simple version of a thing or a more complex version of a thing. All these recipes are organized in a `coobook`.

```js
Cookbook > Recipe > Flavor
```

## Usage

```sh
# setup - for now...
cd ~/urocyon
pnpm link

cd ~/urocyon-cookbook
pnpm link urocyon


~/urocyon-cookbook/node_modules/.bin/urocyon ~/all/urocyon-cookbook editorconfig
```

## Command Reference

### urocyon list

list all recipe books

```sh
urocyon list
```

### urocyon add

add a recipe book

```sh
urocyon add main-cookbook ~/docs/path/to/urocyon-cookbook
```

### urocyon remove

remove a recipe book

```sh
urocyon remove main-cookbook
```

### urocyon activate

activate a recipe directly

```sh
urocyon activate main-cookbook recipe
```
