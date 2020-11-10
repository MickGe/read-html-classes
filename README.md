# Read Html

## What for

To extract tags, classes & id from [shaarli](https://demo.shaarli.org/)'s `index.html`

## How to use

Launch in the terminal:

```bash
deno run --allow-read --allow-write read-html.ts index.html
```

or for debbugging

```bash
deno run --allow-read --allow-write --unstable --watch read-html.ts index.html
```

The result is in `classes.html`.

## Known issues

Maybe too much `<ul>` compare to `</ul>`...

## Sources

[Deno doc](https://doc.deno.land/builtin/stable)
