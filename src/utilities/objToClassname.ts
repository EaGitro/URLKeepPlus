/**
 * Convert object's properties to String.
 * "property1 property2 ..." 
 */



type AnyObj = {
    [K: string]: any;
}

export default function objToClassname(param: AnyObj) {
    let result: string = "";
    let tmp = Object.values(param);
    // console.log("tmp", tmp)
    if (tmp.length == 0) {
        return
    }
    let stack: any[] = tmp;

    while (true) {

        if (stack.length == 0) {
            break
        }
        // console.log("result",result);
        // console.log("stack", stack);
        let popedItem = stack.pop();
        // console.log("popedItem", popedItem);
        if (Object.keys(popedItem).length == 0) {
            break;
        }
        if (typeof popedItem == 'string') {
            result += popedItem + " ";
            continue;
        }
        let objVal = Object.values(popedItem);
        // console.log("objVal", objVal)
        for (let i of objVal) {
            // console.log("i", i);
            if (typeof i === 'string') {
                result += i + " ";
            } else {
                stack.push(i);
                // console.log("stack pushed", stack);
            }
        }


    }
    // console.log(result);
    return result;
}

