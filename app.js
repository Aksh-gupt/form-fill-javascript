var costController = (() => {
    var Expense = function(id, cat, des, value){
        this.id = id;
        this.category = cat;
        this.description = des;
        this.value = value;
    }

    var calculateTotal = () => {
        var sum = 0;
        data.allItems.forEach((cur) => {
            sum += parseFloat(cur.value);
        })
        data.total = sum;
    }

    var data = {
        allItems : [],
        total: 0,
        form: false
    }

    return{
        addItem: (cat,des,value) => {
            var newItem,ID;
            ID = data.allItems.length + 1;
            newItem = new Expense(ID, cat,des,value);
            data.allItems.push(newItem);
            return newItem;
        },
        calculateAmount: () => {
            calculateTotal();
            return data.total;
        },
        deleteItem: (id) => {
            var ids;
            ids = data.allItems.map((cur) => {
               return cur.id; 
            })

            var index = ids.indexOf(parseInt(id));

            if(index !== -1){
                data.allItems.splice(index,1);
            }
        },
        removeForm: ()=>{
            data.form = false;
        },
        addFormPos: () => {
            var obj = document.querySelector(".plus").className;
            if(obj === "plus"){
                return -1;
            }
            else{
                document.querySelector(".plus").classList.remove("plus1");
                data.form = true;
                // console.log(data.form);
                return data.allItems.length;
            }
        },
        checkForm: ()=>{
            var obj = document.querySelector(".plus").className;
            if(obj === "plus"){
                return -1;
            }
            else{
                return 1;
            }
        },
        retItemLen: () => {
            // console.log(data.allItems.length);
            return data.allItems.length;
        },
        removeAllElement: () => {
            var len = data.allItems.length;
            data.allItems = [];
            return len;
        }
    }
})();

var UIcontroller = ( ()=> {
    DOMstring = {
        inputcat: ".input_cat",
        inputdes: ".input_des",
        inputval: ".input_val",
        totalCost: ".total_cost",
        expenseContainer: ".all",
        submitBtn: ".submit_btn",
        removeBtn: ".remove_btn",
        insert: ".ins",
        addForm: ".plus",
        addFormInside: ".form1",
        multipleForm: ".full2",
        back: ".final_back",
        finish: ".finish"
    }
    return{
        elements: ()=>{
            return DOMstring;
        },
        getInput: () => {
            return{
                category: document.querySelector(DOMstring.inputcat).value,
                description: document.querySelector(DOMstring.inputdes).value,
                value: document.querySelector(DOMstring.inputval).value,
            }
        },
        displayTotal: (total) => {
            var a = parseFloat(total);
            a = a.toFixed(2);
            a = a.toString();
            var c = a.split('.');
            var b = c[0];
            if(b.length > 5){
                b = b.substr(0,b.length - 5) + ',' + b.substr(b.length - 5 , 2) + ',' + b.substr(b.length-3,b.length);
            }
            else if(b.length > 3){
                b = b.substr(0,b.length - 3) + ',' + b.substr(b.length - 3 , b.length);
            }
            b = b+'.'+c[1];
            document.querySelector(DOMstring.totalCost).textContent = "Total cost: ₹"+b;
        },
        addItemList : (obj) => {
            var newHtml;
            var html= '<div id="one-%id%" class="one"><div class="head" onclick="toggle(this)"><p class"id">%id%.</p><p class="category" id="category-%id%">%category%: </p><p class="rupee" id="value-%id%"><i class="fa fa-inr" aria-hidden="true"></i>%value%</p><div class="togg"><i class="fa fa-chevron-down" aria-hidden="true"></i></div><div class="togg hide"><i class="fa fa-chevron-up" aria-hidden="true"></i></div></div><div class="description hide" id="description-%id%"><p>%description%</p></div></div>';
            var a = parseFloat(obj.value);
            a = a.toFixed(2);
            a = a.toString();
            var c = a.split('.');
            var b = c[0]; 
            if(b.length > 5){
                b = b.substr(0,b.length - 5) + ',' + b.substr(b.length - 5 , 2) + ',' + b.substr(b.length-3,b.length);
            }
            else if(b.length > 3){
                b = b.substr(0,b.length - 3) + ',' + b.substr(b.length - 3 , b.length);
            }
            b = b+'.'+c[1];
            newHtml = html.replace('%description%',obj.description);
            newHtml = newHtml.replace('%category%',obj.category);
            newHtml = newHtml.replace('%value%',b);
            newHtml = newHtml.replace('%id%',obj.id);
            newHtml = newHtml.replace('%id%',obj.id);
            newHtml = newHtml.replace('%id%',obj.id);
            newHtml = newHtml.replace('%id%',obj.id);
            newHtml = newHtml.replace('%id%',obj.id);
            // console.log(newHtml);
            // console.log(obj.category);
            // console.log(obj.description);
            document.querySelector(DOMstring.expenseContainer).insertAdjacentHTML('beforeend',newHtml);
        },
        removeInput: ()=>{
            var ele = document.querySelector(DOMstring.insert);
            // ele.parentNode.removeChild(ele);
            ele.parentNode.removeAll
            // console.log("run");
        },
        addInput: (ind) => {
            var html = '<div class="ins"><div class="last">%id%.</div><div class="for"><div class="cat"><p>Category</p><button onclick="rmv_form(this)" type="button" class="remove_btn"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"/></svg>Remove</button></div><input class="tex input_cat" type="text" id="mul_cat" placeholder="Example: Entry, food, or parking etc." /><p>Description</p><textarea style="resize: none;" class="tex input_des" type="text" id="mul_des" placeholder="Example: Entry, food, or parking etc." rows="4" cols="45"></textarea><p>Ticket price for this category?</p><p class="inp" id="id_input_val"><label style="padding-top: 0.6em;" for="mul_amount"><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></label><input onkeyup="keyup(this)" class="input_val" type="number" id="mul_amount" placeholder="Price per ticket" /></p></div></div>';
            var newHtml = html.replace('%id%',ind);
            document.querySelector(DOMstring.addFormInside).insertAdjacentHTML('beforeend',newHtml);
        },
        addFirstInput: (ind) => {
            var html = '<div class="ins"><div class="last">%id%.</div><div class="for"><div class="cat"><p>Category</p></div><input class="tex input_cat" type="text" id="mul_cat" placeholder="Example: Entry, food, or parking etc." /><p>Description</p><textarea style="resize: none;" class="tex input_des" type="text" id="mul_des" placeholder="Example: Entry, food, or parking etc." rows="4" cols="45"></textarea><p>Ticket price for this category?</p><p class="inp" id="id_input_val"><label style="padding-top: 0.6em;" for="mul_amount"><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></label><input onkeyup="keyup(this)" class="input_val" type="number" id="mul_amount" placeholder="Price per ticket" /></p></div></div>';
            var newHtml = html.replace('%id%',ind);
            document.querySelector(DOMstring.addFormInside).insertAdjacentHTML('beforeend',newHtml);
        },
        clearField: () => {
            var field,fieldArr;
            field = document.querySelectorAll(DOMstring.inputdes + ', ' + DOMstring.inputval+', '+DOMstring.inputcat);
            fieldArr = Array.prototype.slice.call(field);
            fieldArr.forEach(function(current,index,array){
                current.value = "";
            })
            fieldArr[0].focus();
        },
        updateFormId: (len) => {
            len++;
            // var leng = parseInt(len);
            // leng++;
            // var obj = leng.toString();
            // console.log(obj);
            // console.log(document.querySelector(".last").innerHTML);
            document.querySelector(".last").innerHTML = len+'.';
        },
        removeAll: (len) => {
            for(var i = 1;i<=len;i++){
                var ele = document.getElementById("one-"+i);
                ele.parentNode.removeChild(ele);
            }
        }
    }
})();

var controller = ( (costCtrl, UICtrl) => {
    setupEventListner = () => {
        // console.log("setup");
        var DOM = UICtrl.elements();
        document.querySelector(DOM.submitBtn).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',(event) => {
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.addForm).addEventListener('click',addForm);
        document.querySelector(DOM.back).addEventListener('click',clearList);
        document.querySelector(DOM.finish).addEventListener('click',clearList);
    }

    clearList = () => {
        var len = costCtrl.removeAllElement();
        UICtrl.removeAll(len);
        addFormWhenBack();
        // var len = costCtrl.retItemLen();
        // UICtrl.updateFormId(len);
        // UICtrl.clearField();
        updateBudget();
    }
    updateBudget = () => {
        var total = costCtrl.calculateAmount();
        UICtrl.displayTotal(total);
    }

    ctrlAddItem = ()=>{
        var check = costCtrl.checkForm();
        if(check !== -1){
            alert("Form is not present. To add more cost please click on category");
        }
        else{
            var input = UICtrl.getInput();
            var DOM = UICtrl.elements();
            // console.log(input.value);
            if(input.value < 0 || isNaN(input.value) || input.value == ""){
                // console.log("aksh");
                document.getElementById("id_input_val").classList.add("inp1");
                document.getElementById("id_input_val").classList.remove("inp");
            }
            if(input.description !== "" && input.category !== "" && !isNaN(input.value) && input.value > 0){
                var newItem = costCtrl.addItem(input.category,input.description,input.value);
                UICtrl.addItemList(newItem);
                updateBudget();
                var len = costCtrl.retItemLen();
                UICtrl.updateFormId(len);
                UICtrl.clearField();
                // console.log("run");
                if(len == 1){
                    // console.log("run1");
                    document.querySelector(DOM.addFormInside).innerHTML = "";
                    len++;
                    UICtrl.addInput(len);
                }
            }
            else{
                alert("Please enter valid details");
            }
        }
    }

    removeForm = () => {
        // console.log("run");
        UICtrl.removeInput();
        costCtrl.removeForm();
    }
    addForm = () => {
        var ind = costCtrl.addFormPos();
        if(ind === -1){
            alert("Form is already present");
        }
        else{
            ind++;
            UICtrl.addInput(ind);
        }
    }
    addFormWhenBack = () => {
        var ind = costCtrl.addFormPos();
        // if(ind !== -1){
        //     ind++;
        //     UICtrl.addInput(ind);
        // }
        document.querySelector(".form1").innerHTML = "";
        UICtrl.addFirstInput(1);
    }

    return {
        init: () => {
            console.log("application is started");
            setupEventListner();
        }
    }
})(costController,UIcontroller);

controller.init();
