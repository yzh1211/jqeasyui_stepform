/*
 *	@author yzh 20190626 23:11
 *  伪分步提交
 *  表单扔到dialog里，每次只显示一个formItem
 *  需要放到一起显示的内容都用一个<div class="formItem"></div>包装起来
*/

let step = 0, total = 0;
let $form   = null;
let $dialog = null;
let dlgId = null;

//初始化对话框，只显示第一个form,其它隐藏
function initStepDialog(formId,contentId,dialogId){
	//定义全局变量 step:当前是第几步 total:总共有多少步
    $form = $("#"+formId);  
    if ($form === null){
        console.log("initStepDialog 第1个参数出错,找不到该表单");
        return ;
    }
    $dialog = $("#"+contentId);
    if ($dialog === null){
        console.log("initStepDialog 第2个参数出错,找不到该内容");
        return ;
    }
    dlgId = dialogId;
    $form.find(".formItem").each(function(i,item){
    	$(item).hide();
    });
    total = $form.find(".formItem").length;
    $form.find(".formItem").eq(0).show();
    $form.appendTo($dialog).show();
    renderStepButton(step);

}

initStepDialog("hiddenForm","content","aaa");
//上一步 点击事件
function prev(){
    if(step === 0){
        return ;
    }
    if (step > 0) {
    	$form.find(".formItem").eq(step).hide();
        step--;
    	$form.find(".formItem").eq(step).show();
    }        
    if(step < 0 ){
        step = 0;
    }

    loadFormItem();
}

//下一步 点击事件
    function next(){
        if (step === total) {
            return ;
        }
        $form.find(".formItem").eq(step).hide();
        step++;
        $form.find(".formItem").eq(step).show();

        loadFormItem();
    }
//将下一个表单填入对话框内，如果已经完成最后一步，则关闭对话框
    function loadFormItem(){
        if(step <= total-1 ){
            renderStepButton(step);
        }else{
        	console.log("form 步骤结束");
            $("#"+dlgId).dialog('close');
        }
    }


//重新渲染步骤按钮
    function renderStepButton(step){
        if(step === 0){
            $("#prev").hide();
            $.parser.parse( $("#next"))
            return ;
        }
        if(step === total-1) {
            $("#prev").show();
            $("#next").show().text("完成");
            $.parser.parse( $("#prev"))
            $.parser.parse( $("#next"))
            return;
        }

        $("#prev").show().text("上一步");
        $("#next").show().text("下一步");
        $.parser.parse( $("#prev"))
        $.parser.parse( $("#next"))
    }

