const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const rootUrl = 'https://navi.cnki.net/knavi/rss';
    const id = ctx.params.id;
    const response = await got({
        method: 'get',
        url: `${rootUrl}/${id}`,
    });

    const $ = cheerio.load(response.data, {
        xmlMode: true,
    });

    const list = $('channel item')
        .map((_, item) => {
            item = $(item);
            return {
                title: item.find('title').text(),
                link: item.find('link').text(),
                description: item.find('description').text(),
                language: item.find('language').text(),
                pubDate: item.find('pubDate').text(),
            };
        })
        .get();

    ctx.state.data = {
        title: $('channel title').first().text(),
        link: $('channel link').first().text(),
        description: $('channel description').first().text(),
        language: $('channel language').first().text(),
        item: list,
    };
};
