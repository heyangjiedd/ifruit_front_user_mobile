export function getDeep(data) {
    let result = 0;
    let num = 0;
    const fn = (pid)=>{
        num++;
        let parent = data.find(item=>{return item.id === pid});
        if(parent&&parent.pid){
            fn(parent.pid)
        }else {
            num++;
        }
    };
    data.forEach(item=>{
        fn(item.pid);
        result = Math.max(num,result);
        num = 0;
    });
    return result;
}
export function listToTreeData(list,map) {
    if (!Array.isArray(list)) {
        return [];
    }
    list.forEach(item => {
        if (item.pid) {
            let parent = list.find(r => {
                return r.id === String(item.pid);
            });
            if(parent){
                parent.children = parent.children || [];
                parent.children.push(item);
            }
        }
    });
    return list.filter(item=>{
        item[map[1]]=item[map[0]]||''
        item[map[3]]=item[map[2]]||''
        return item.pid==='0'||item.pid===null;
    })
}


export function listToFilterPid(list) {
    if (!Array.isArray(list)) {
        return [];
    }
    return list.filter(item=>{
        return !(item.pid!=='0'&&item.pid!==null)
    })
}
