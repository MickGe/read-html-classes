# Read Html

## What for

To extract tags, classes & id from [shaarli](https://demo.shaarli.org/)'s `index.html`

## How to use

### Launch in the terminal

```console
deno run --allow-read --allow-write read-html.ts <INPUT_PATH/filename.html> [OUTPUT_PATH]
```

or:

```bash
./read-html.ts <INPUT_PATH/filename.html> [OUTPUT_PATH]
```

&#x26A0; On bash script, _deno_ is configured with `--allow-all`.  
Or switch lines 1 & 2 and change `--allow-write=/Users/<username>/`.

### Output

The result is in `classes.html`.

### Debugging tips

```console
deno run --allow-read --allow-write --unstable --watch read-html.ts <INPUT_PATH/filename.html> [OUTPUT_PATH]
```

## Known issues

Maybe too much `<ul>` compare to `</ul>`...

## Sources

[Deno doc](https://doc.deno.land/builtin/stable)
