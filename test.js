const Wappalyzer = require('./index.js')

const options = {
  debug: false,
  delay: 500,
  headers: {},
  maxDepth: 3,
  maxUrls: 10,
  maxWait: 10000,
  recursive: true,
  probe: true,
  proxy: false,
  userAgent: 'Wappalyzer',
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
  noScripts: false,
  noRedirect: false,
};

const wappalyzer = new Wappalyzer(options);

const urls = ['https://www.google.com']

;(async function() {
  try {
    await wappalyzer.init()

    const results = await Promise.all(
      urls.map(async (url) => {
        const site = await wappalyzer.open(url)

        const results = await site.analyze()

        // Icons: https://raw.githubusercontent.com/ramazansancar/webappalyzer-js/assets/icons/${icon}
        return { url, results }
      })
    )

    console.log(JSON.stringify(results, null, 2))
  } catch (error) {
    console.error(error)
  }

  await wappalyzer.destroy()
})()