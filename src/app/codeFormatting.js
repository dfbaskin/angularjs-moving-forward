
import hljs from 'highlightjs';
import 'highlightjs/styles/vs.css!';

export default function() {

    // Highlight all of the code snippets
    let codeSnippets = document.querySelectorAll('pre code');
    let codelist = Array.prototype.slice.call(codeSnippets);
    codelist.forEach(function(item) {
        hljs.highlightBlock(item);
        item.parentNode.className = "hljs-pre";
    });

}
