/**
 * Ruby annotation plugin for TinyMCE
 *
 * Copyright 2021 University of Nottingham (http://rogo-oss.nottingham.ac.uk)
 * @author Dr Joseph Baxter
 * @author Naseem Sarwar
 */
import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('ruby-annotation', {
    icon: 'ruby',
    tooltip: 'title',
    onAction: () => {
      tinymce.activeEditor.windowManager.open({
        title: 'title', // The dialog's title - displayed in the dialog header
        body: {
          type: 'panel',
          items: [
            {
              type: 'textarea',
              name: 'rb',
              label: 'text',
              placeholder: 'text'
            },
            {
              type: 'htmlpanel',
              html: '<style>#rubyPreview {text-align: center;font-size: 2em;}.wrap > ruby > rt {font-size: 0.5em;}</style><div class="previewWrapper"><h3>preview</h3><div id="rubyPreview"></div></div>',
            },
          ]
        },
        buttons: [ // A list of footer buttons
          {
            type: 'submit',
            text: 'add',
            name: 'add',
            disabled: true
          },
          {
            type: 'cancel',
            text: 'cancel',
            name: 'cancel',
            primary: true
          }
        ],
        onChange: function (dialogApi, details) {
          const data = dialogApi.getData();
          /* Example of enabling and disabling a button, based on the checkbox state. */
          const toggle = data.rb ? dialogApi.enable : dialogApi.disable;
          toggle('add');
          document.getElementById('rubyPreview').innerHTML = constructTag(data.rb);
        },
        onSubmit: function (dialogApi) {
          const data = dialogApi.getData();
          tinymce.activeEditor.execCommand('mceInsertContent', false, constructTag(data.rb));
          dialogApi.close();
        },
        initialData: { rb: init() },
      });
    }
  });
};

export default (): void => {
  // Load the required translation files
  tinymce.PluginManager.requireLangPack('ruby-annotation', 'en');
  // Register the custom plugin
  tinymce.PluginManager.add('ruby-annotation', setup);
};

/**
 * Constructing the string of tags.
 * @package string rbValue text(text)
 */
function constructTag(rbValue) {
  let ruby = ''; let k = 0;
  for(let l = 0; l < rbValue.length; l++) {
    if(rbValue.charAt(l) == "(") {
      l++; k++;
      ruby += '<rp>{</rp><rt>' + rbValue.charAt(l) ;
    }else if(rbValue.charAt(l) == ")") {
      ruby += '</rt><rp>}</rp></ruby>';
      k--;
    }else if(k > 0) {
      ruby +=  rbValue.charAt(l) ;
    } else {
      ruby += '<ruby><rb>' + rbValue.charAt(l) + '</rb>';
      if(rbValue.charAt(l+1) != "("){
        ruby += '</ruby>';
      }
    }
  }
  return "<span class='wrap'>" + ruby + "</span>";
}

/**
 * Load existing ruby
 */
function init () {
  let value = '';
  // Get the selected contents as text and place it in the input
  const rubyValue = tinymce.DOM.getParent(tinymce.activeEditor.selection.getNode(), 'span');
  if (rubyValue !== null) {
    const elements = rubyValue.getElementsByTagName('ruby');
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.indexOf('{') > -1) {
        const rt = elements[i].getElementsByTagName('rt')[0].innerHTML;
        value += elements[i].textContent.split("{")[0] + '(' + rt + ')';
      } else {
        value += elements[i].textContent;
      }
    }
  }
  return value;
}
