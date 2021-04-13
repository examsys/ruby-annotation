import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('ruby-annotation', {
    text: 'ruby-annotation button',
    onAction: () => {
      editor.setContent('<p>content added from ruby-annotation</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('ruby-annotation', setup);
};
