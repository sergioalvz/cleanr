# `cleanr`

<!-- TOC -->

* [`cleanr`](#cleanr)
  * [`cleanr twitter`](#cleanr-twitter)
    * [`cleanr twitter count`](#cleanr-twitter-count)
    * [`cleanr twitter select`](#cleanr-twitter-select)
    * [`cleanr twitter verify`](#cleanr-twitter-verify)

<!-- /TOC -->

---

```shell
$ cleanr --help

  Usage: cleanr [options] [command]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information

  Commands:

    twitter        set of commands to work with Twitter
    help [cmd]     display help for [cmd]
```

## `cleanr twitter`

```shell
$ cleanr help twitter

  Usage: cleanr-twitter [options] [command]

  Options:

    -h, --help        output usage information

  Commands:

    count [options]   counts the number of tweets
    select [options]  returns identifiers with matching criteria
    verify [options]  verifies that everything's okay
```

### `cleanr twitter count`

```shell
$ cleanr twitter count --help

  Usage: count [options]

  counts the number of tweets

  Options:

    -f, --file [path]  path to back-up file
    -h, --help         output usage information
```

### `cleanr twitter select`

```shell
$ cleanr twitter select --help

  Usage: select [options]

  returns identifiers with matching criteria

  Options:

    -f, --file [path]  path to back-up file
    --until [date]     date until that identifiers will be returned
    -h, --help         output usage information
```

### `cleanr twitter verify`

```shell
$ cleanr twitter verify --help

  Usage: verify [options]

  verifies that everything's okay

  Options:

    -t, --access-token [token]          user's access token
    -s, --access-token-secret [secret]  user's access token secret
    -h, --help                          output usage information
```
