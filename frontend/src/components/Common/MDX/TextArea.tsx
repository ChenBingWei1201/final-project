import "@mdxeditor/editor/style.css";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import type { SandpackConfig } from "@mdxeditor/editor";
import {
  toolbarPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  frontmatterPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  KitchenSinkToolbar,
} from "@mdxeditor/editor";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const reactSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

const imageUploadHandler = async (image: File) => {
  if (!image) {
    return "image upload fail!";
  }
  const imageUpload = image.name + v4();
  const imageRef = ref(storage, `images/${imageUpload}`);
  await uploadBytes(imageRef, image).then(() => {
    alert("Image Uploaded!");
  });
  const imageURL = await getDownloadURL(ref(storage, `images/${imageUpload}`))
    .then((url) => {
      // `url` is the download URL for `images/${image.name}`
      return url;
    })
    .catch((error) => {
      // Handle any errors
      return `${error}`;
    });

  return imageURL;
};

const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({
    toolbarContents: () => {
      return (
        <>
          <KitchenSinkToolbar />
        </>
      );
    },
  }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  // eslint-disable-next-line @typescript-eslint/require-await
  imagePlugin({ imageUploadHandler }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "text",
      tsx: "TypeScript",
      cplusplus: "C++",
      java: "Java",
      c: "C",
    },
  }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
  markdownShortcutPlugin(),
];

type TextAreaProps = {
  article?: string;
  // setArticle: (article: string) => void;
  editorRef: any;
};

function TextArea({ article, editorRef }: TextAreaProps) {
  if (!article) article = "";
  const placeholder = `# Title`;

  return (
    <>
      <div>
        <MDXEditor
          placeholder={placeholder}
          markdown={article}
          plugins={allPlugins("Hello world")}
          ref={editorRef}
        />
      </div>
    </>
  );
}

export default TextArea;
