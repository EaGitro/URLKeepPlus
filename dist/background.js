

var script01 = function()
{
    chrome.runtime.openOptionsPage();
};
 
(function()
{
    chrome.action.onClicked.addListener(script01);
})();