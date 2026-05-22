require('dotenv').config();

const fs = require('fs');
const contentful = require('contentful-management');

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const data = JSON.parse(
  fs.readFileSync('./articles.json', 'utf8')
);

async function run() {
  const space = await client.getSpace(
    process.env.CONTENTFUL_SPACE_ID
  );

  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT
  );

  for (const item of data.entries) {
    try {
      const entry = await environment.createEntry(
        item.contentType,
        {
          fields: item.fields,
        }
      );

      await entry.publish();

      console.log(
        `✅ Published: ${item.fields.title['en-US']}`
      );
    } catch (err) {
      console.error(
        `❌ Failed: ${item.fields.title['en-US']}`
      );

      console.error(err.message);
    }
  }
}

run();