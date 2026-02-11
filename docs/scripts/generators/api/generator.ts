import fs from "fs";
import path from "path";

// TODO: add support for params later on.
type HoppscotchRequest = {
	// e.g.: "listUsers"
	name: string;
	// e.g.: "GET"
	method: string;
	// e.g.: "http://localhost:3000/api/trpc/identity.listUsers"
	endpoint: string;
	body: {
		// e.g.: "application/json"
		contentType: string;
		body: string;
	};
};

type HoppscotchFolder = {
	name: string;
	requests: HoppscotchRequest[];
};

const getInitialFileContent = (index: number, title: string) => {
	return `---
sidebar_position: ${index}
---

# ${title}
`;
};

const parseRequest = (request: HoppscotchRequest): string => {
	return `
### **${request.method}** ${request.name}

\`\`\`json
${request.body.body?.trim() ?? "No body."}
\`\`\`
`;
};

const getCollection = (): { folders: HoppscotchFolder[] } => {
	const fileString = fs.readFileSync("../hoppscotch.json", "utf-8");
	const file = JSON.parse(fileString);

	const folder = file.find((folder: { name: string }) => folder.name === "primus-inter-pares-2026");
	return { folders: folder.folders };
};

export const generateAPIDocs = () => {
	const outputDir = path.join(__dirname, "../../../docs/api");

	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

	const collection = getCollection();

	let index = 2;
	for (const folder of collection.folders) {
		const fileName = folder.name;
		const fileContent = [getInitialFileContent(index, fileName)];

		for (const request of folder.requests) {
			const content = parseRequest(request);

			fileContent.push(content);
		}

		const finalFileContent = fileContent.join("");

		const outputPath = path.join(outputDir, `${fileName}.md`);
		fs.writeFileSync(outputPath, finalFileContent);

		index += 1;
	}
};
