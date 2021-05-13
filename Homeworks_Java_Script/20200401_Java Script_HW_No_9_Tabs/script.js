let tabs = document.getElementById("tabs");
tabs.addEventListener("click", chooseTab );

function chooseTab () {
    let allTabs = event.currentTarget.children;
    let allTabsAsArray = Array.prototype.slice.call(allTabs);

    let contentTabs = document.getElementById("content-tabs").children;
    let contentTabsAsArray = Array.prototype.slice.call(contentTabs);

    let numbOfActiveTab = 0;

    for (let key of allTabsAsArray) {
        key.classList.remove("active");
        if (key===event.target) {
            event.target.classList.add("active");
            numbOfActiveTab = allTabsAsArray.indexOf(key);
        }
    }

    for (let item of contentTabsAsArray) {
        item.classList.add("hidden");
        if (contentTabsAsArray.indexOf(item)===numbOfActiveTab) {
            item.classList.remove('hidden');
        }
    }
}