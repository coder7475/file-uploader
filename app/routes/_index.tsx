import { unstable_parseMultipartFormData, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const action = async ({ request }) => {
  const uploadHandler = async ({ data, filename, mimetype, name }) => {
    if (name !== "my-file") {
      return undefined;
    }

    // Collect file data into a buffer
    const chunks = [];
    for await (const chunk of data) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    console.log(`File uploaded: ${filename}, Type: ${mimetype}`);
    console.log(buffer);

    // Return the filename for feedback
    return filename;
  };

  try {
    // Parse the form data and handle the file upload
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler,
    );
    const fileName = formData.get("my-file");

    if (!fileName) throw new Error("File upload failed");

    return json({ fileName });
  } catch (error) {
    console.error(error);
    return json({ error: error.message }, { status: 500 });
  }
};

export default function Index() {
  const actionData = useActionData();

  const renderUploadStatus = () => {
    if (actionData?.error) {
      return <p className="text-red-500">Error: {actionData.error}</p>;
    }
    if (actionData?.fileName) {
      return (
        <p className="text-green-500">Uploaded File: {actionData.fileName}</p>
      );
    }
    return null;
  };

  return (
    <div className="remix__page">
      <main>
        <h2 className="text-2xl font-bold">File Upload in Remix v2</h2>
        <Form method="post" encType="multipart/form-data">
          <input type="file" name="my-file" />
          <button type="submit">Upload</button>
        </Form>
        <div className="mt-4">{renderUploadStatus()}</div>
      </main>
    </div>
  );
}
