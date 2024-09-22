declare module 'html2pdf.js' {
    export function from(element: HTMLElement): {
      set(options: any): {
        save: (filename?: string) => Promise<void>;
      };
    };
  }
  