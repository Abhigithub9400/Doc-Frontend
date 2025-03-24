export default defineAppConfig({
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'svg',
    customize: (content: string, name: string, prefix: string) => {
      if (prefix !== 'icon') return content;

      return content
        .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`)
        .replace(/fill="[^"]*"/g, `fill="white"`)
        .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`);
    },
  },
});
