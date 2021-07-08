/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
export default function ContentActions(state, dispatch, backend) {
  const fetchArticle = async (path) => {
    try {
      const articleResult = await backend.content.getArticle(path);
      const content = {
        title: articleResult.result[0].name,
        main: articleResult.result[0].content.en,
        sidebar: articleResult.result[0].sidebar,
      };

      // Make additional requests for Censhare xlink:href links
      const xlinkRegex = /xlink:href="([\S]+)"/g;
      const sections = ['keyVisual', 'richText'];

      // Replace xlink:href matches in each section
      // Async/await doesn't work in foreach loop, use regular for loop
      for (let i = 0; i < sections.length; i++) {
        if (content.main[sections[i]] !== undefined) {
          const matches = content.main[sections[i]].matchAll(xlinkRegex);
          for (const match of matches) {
            const contentLink = await backend.content.getContentLink(match[1]);
            content.main[sections[i]] = content.main[sections[i]].replace(match[1], contentLink.downloadLink);
          }
        }
      }

      // Repalce xlink:href matches in sidebar
      if (content.sidebar !== undefined) {
        for (let i = 0; i < content.sidebar.length; i++) {
          const matches = content.sidebar[i].richText.matchAll(xlinkRegex);
          for (const match of matches) {
            const contentLink = await backend.content.getContentLink(match[1]);
            content.sidebar[i].richText = content.sidebar[i].richText.replace(match[1], contentLink.downloadLink);
          }
        }
      }
      dispatch({ type: 'SET_CONTENT_DETAILS', payload: { status: true, content } });
    } catch (e) {
      dispatch({ type: 'SET_CONTENT_DETAILS', payload: { status: false, content: null } });
    }
  };


  return {
    fetchArticle,
  };
}
