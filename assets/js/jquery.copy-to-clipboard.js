$.fn.CopyToClipboard=function(){var textToCopy=false;if(this.is('select')||this.is('textarea')||this.is('input')){textToCopy=this.val();}else{textToCopy=this.text();}CopyToClipboard(textToCopy);};function CopyToClipboard(val){var hiddenClipboard=$('#_hiddenClipboard_');if(!hiddenClipboard.length){$('body').append('<textarea style="position:absolute;top: -9999px;" id="_hiddenClipboard_"></textarea>');hiddenClipboard=$('#_hiddenClipboard_');}hiddenClipboard.html(val);hiddenClipboard.select();document.execCommand('copy');document.getSelection().removeAllRanges();}$(function(){$('[data-clipboard-target]').each(function(){$(this).click(function(){$($(this).data('clipboard-target')).CopyToClipboard();});});$('[data-clipboard-text]').each(function(){$(this).click(function(){CopyToClipboard($(this).data('clipboard-text'));});});});