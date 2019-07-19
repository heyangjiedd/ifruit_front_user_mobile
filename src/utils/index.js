export function getDeep(data) {
    let result = 0;
    let num = 0;
    const fn = (pid)=>{
        num++;
        let parent = data.find(item=>{return item.id == pid});
        if(parent&&parent.pid){
            fn(parent.pid)
        }
    };
    data.forEach(item=>{
        fn(item.pid);
        result = Math.max(num,result);
        num = 0;
    });
    return result;
}
