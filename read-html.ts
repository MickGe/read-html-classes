// Deno doc: https://doc.deno.land/builtin/stable

const filenames = Deno.args;
const filename = (filenames[0]);
const data = await Deno.readTextFile(filename);

const regexBody = /<body>(\n.*)*<\/body>/g;
const regexNewL = /(?<=>([^\n][^<>]*))</g;
const body = data.match(regexBody)?.join("")
	.replaceAll(/\n/g, "")
	.replaceAll(/(\t)|( {2,})|(\n*)/g, "")
	.replaceAll(/></g, ">\n<")
	.replaceAll(/(?<=\w)class/g, " class")
	.replaceAll(regexNewL, "\n<");

const arrBody = body?.split("\n");

const regexClass = /(?<=class=")[^"]*(?=")/gm;
const regexId = /(?<=id=")[^"]*(?=")/gm;
const regexTextContent = /(?<=>).*/gm;
const regexClosingTag = /<\//gm;
const regexTag = /(?<=<)[^ >\/]*(?!= )/gm;
const regexAutoClose = /\/>/gm;

const result = arrBody?.map(line => {
	const className = line.match(regexClass);
	const idName = line.match(regexId);
	const textContent = line.match(regexTextContent)?.join("").trim();
	const tagName = line.match(regexTag)?.join("");
	const closingTag = !!line.match(regexClosingTag);
	const autoClose = !!line.match(regexAutoClose);
	let textStart = `${(closingTag || tagName === 'body' || autoClose) ? "" : '<ul>'}`;
	const textClass = (!!className) ? `<li class="max-width"><span class="bold">Tag: ${tagName}</span> &#x279F <span class="bold">Class:</span> ${className}${!!idName ? ` &#x279F <span class="bold">Id:</span> ${idName}` : " "}${textContent ? `<span class="italic">(content: ${textContent})</span>` : " "}</li>\n` : "";
	const textEnd = `${(closingTag || autoClose) ? '</ul>' : ""}`;
	return (textStart + textClass + textEnd);
}).filter(el => !!el) || [];

const style = `<style>
	.max-width {
		width: max-content;
	}
	.italic {
		font-style: italic;
	}
	.bold {
		font-weight: bold;
	}
</style>`

const header = `<!DOCTYPE html>\n<html>\n<head>\n<title>Classes</title>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n<meta name = "viewport" content = "width=device-width, initial-scale=1" >\n${style}\n</head>\n<body>\n`;
const footer = "\n</body>\n</html>";

result.unshift(header);
result.push(footer);

const encoder = new TextEncoder();
// await Deno.writeFile("text.txt", encoder.encode(body));
await Deno.writeFile("classes.html", encoder.encode(result?.join("\n")));