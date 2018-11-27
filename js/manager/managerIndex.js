$(document).ready(function () {
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
});
//查询所有班级信息
function getCollege() {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team'  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                    +"<td>" + n.claName + "</td>"+ "<td>"+ n.createDate + "</td><td>"
                    + "<a id='withdraw' onclick='delClass(this,"+ n.claId + ")'>删除</a> </td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//查询个别班级信息
function checkOneCollege() {
    $('div.all_info').load("college.html #content");
    console.log("test---" + $('#claId').val() + "---" + $('#graName').val() );
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?graName=' + $('#graName').val()+ '&acaName=' + $('#acaName').val()+ '&proName=' + $('#proName').val() ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                if(!n.createDate) {
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>--</td><td>"
                        + "<a id='withdraw' onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                else{
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>" + n.createDate + "</td><td>"
                        + "<a id='withdraw' onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除班级信息
function delClass(i, claId) {
    let r = confirm("是否删除该班级？");
    if(r == true){
        i.parentNode.parentNode.remove();
        $.ajax({
            //请求方式
            type: 'DELETE',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?claId=' + claId  ,
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //服务器返回的数据类型
            dataType: 'json',
            success:function(data) {
                //请求成功函数内容
                console.log(data.msg);
                console.log(data.result);
                if(data.result == 'success'){
                    alert('删除成功！');
                }
                else{
                    alert(data.msg);
                }
            },
            error : function(data){
                //请求失败函数内容
                console.log(data.result);
            }
        });
    }
}
//添加班级?班级已存在？
function addCollege() {
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'graName' :       $('#graName').val(),
            'acaName' :           $('#acaName').val(),
            'proName' :       $('#proName').val(),
            'claName' :       $('#claName').val(),
            'createDate' :       $('#createDate').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType : 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("addCollege.html");
            }
            else{
                alert(data.msg);
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data);
        }
    });
}

//查询管理员信息
function getManager() {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/superManager/manager"  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.manId + "</td>" + "<td>" + n.manName + "</td>" + "<td>" + n.sex + "</td>"
                    +"<td>" + n.graName + "</td>" + "<td>"+ n.job + "</td>" + "<td>"+ n.phone + "</td>" + "<td>"+ n.createDate + "</td><td>"
                    + "<a id='withdraw' onclick='delManager(this,"+ n.manId + ")'>删除</a> <a id='select' target='_parent' onclick='editManager("
                    + n.manId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//查询个别管理员信息
function checkOneManager(){
    $('div.all_info').load("manager.html #content");
    console.log("test---" + $('#manId').val() + "---" + $('#manName').val())
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + $('#manId').val() + '&manName=' + $('#manName').val(),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function (i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.manId + "</td>" + "<td>" + n.manName + "</td>" + "<td>" + n.sex + "</td>"
                    + "<td>" + n.graName + "</td>" + "<td>" + n.job + "</td>" + "<td>" + n.phone + "</td>" + "<td>" + n.createDate + "</td><td>"
                    + "<a id='withdraw' onclick='delManager(this," + n.manId + ")'>删除</a> <a id='select' target='_parent' onclick='editManager(" + n.manId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            alert(data.result)
            console.log(data.result);
        }
    });
}
//添加管理员信息
function addManager() {
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager',
        //url: 'http://192.168.191.2:8080/CourseSystem/superManager/manager',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'manName' :       $('#manName').val(),
            'sex' :           $('#sex').val(),
            'job' :       $('#job').val(),
            'phone' :       $('#phone').val(),
            'graName' :       $('#graName').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType : 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("addManagerForm.html");
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除管理员信息
function delManager(i, manId) {
    let r = confirm("是否删除该管理员？");
    if(r == true) {
        i.parentNode.parentNode.remove();
        $.ajax({
            //请求方式
            type: 'DELETE',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + manId,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.result == 'success') {
                    alert('删除成功！');
                    window.close();
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
            }
        });
    }
}
//修改管理员
var managerId;
function editManager(manId){
    managerId = manId;
    $('div.all_info').load("changeManagerInfo.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + managerId ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            $.each(data.result, function(i, n) {
                $('#manName').val(n.manName);
                $('#sex').val(n.sex);
                $('#graName').val(n.graName);
                $('#job').val(n.job);
                $('#phone').val(n.phone);
                $('#createDate').val(n.createDate);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data);
        }
    });
}
function changeManagerInfo1(){
    let ManagerPhone = $('#phone').val();
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;     //联系号码的正则表达式
    if(reg.test(ManagerPhone)) {
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + managerId,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: JSON.stringify({
                manId : managerId,
                manName: $('#manName').val(),
                sex: $('#sex').val(),
                phone: $('#phone').val(),
                graName: $('#graName').val(),
                job: $('#job').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.result == 'success') {
                    alert('修改成功!');
                    self.location.load = -1;
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
            }
        });
    }
    else{
        alert("联系号码有误，请重新输入");
    }
}


//查询超级管理员信息
function getSuperManager() {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/selves'  ,
        //url: 'http://192.168.137.1:8080/CourseSystem/superManager/selves'  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                if(!n.createBy) {
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        + "<td>" + n.phone + "</td>" + "<td>--</td>" + "<td>" + n.createDate + "</td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        + "<td>" + n.phone + "</td>" + "<td>" + n.createBy + "</td>" + "<td>" + n.createDate + "</td></tr>";
                }
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询个别超级管理员信息
function checkOneSuperManager() {
    $('div.all_info').load("superManager.html #content");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/selves?supId=' + $('#supId').val() + '&supName=' + $('#supName').val() ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                if(!n.createBy) {
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        + "<td>" + n.phone + "</td>" + "<td>--</td>" + "<td>" + n.createDate + "</td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        + "<td>" + n.phone + "</td>" + "<td>" + n.createBy + "</td>" + "<td>" + n.createDate + "</td></tr>";
                }
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//添加超级管理员信息
function addSuperManager() {
    let superManagerPhone = $('#phone').val();
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;     //联系号码的正则表达式
    if(reg.test(superManagerPhone)) {
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
            //url: 'http://192.168.137.1:8080/CourseSystem/superManager/self',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //数据
            data: JSON.stringify({
                    "supName": $('#supName').val(),
                    "sex": $('#sex').val(),
                    "phone": $('#phone').val()
                }
            ),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.result == 'success') {
                    alert('录入成功!');
                    self.location.load = -1;
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
            }
        });
    }
    else{
        alert("联系号码有误，请重新输入");
    }
}


function editInfo(){
    $('#phone').removeAttr("readonly");
    $('#phone').focus();
}

function saveInfo(){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'supName': $('#supName').val(),
            'sex': $('#sex').val(),
            'phone': $('#phone').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            console.log(data.result);
            if (data.result == 'success') {
                alert('保存成功!');
            }
            window.close();
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
/*
function saveManager(manId){
    //alert(manId);
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager' ,
        data: JSON.stringify({
            supId : manId,
            supName :  $('#supName').val(),
            sex :  $('#sex').val(),
            phone :  $('#phone').val(),
            graName : $('#graName').val(),
            job : $('#job').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('修改成功!');
            }
            $('div.all_info').load("changeManagerInfo.html");
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}*/
//查询
function manage() {
    let options = $("#operation option:selected"); //获取选中的项
    if(options.val() ==  '学院管理'){
        $('div.all_info').load("college.html #content");
        getCollege();
    }
    else if(options.val() ==  '管理员管理'){
        $('div.all_info').load("manager.html #content");
        getManager();
    }
    else if(options.val() ==  '超级管理员管理'){
        $('div.all_info').load("superManager.html #content");
        getSuperManager();
    }
}
function check(){
    let options = $("#operation option:selected");
    if (options.val()=="学院管理"){
        $('div.all_info').load("college.html #content");
        $('#tbBody').html("");
        getCollege();
    }
    else if (options.val() == "管理员管理") {
        $('div.all_info').load("manager.html #content");
        $('#tbBody').html("");
        getManager();
    }
    else if (options.val() == "超级管理员管理") {
        $('div.all_info').load("superManager.html #content");
        $('#tbBody').html("");
        getSuperManager();
    }
    else{
        $("#operation").val("学院管理");
        $('div.all_info').load("college.html #content");
        $('#tbBody').html("");
        getCollege();
    }
}
//添加
function add(){
    let options = $("#operation option:selected");
    if (options.val() == "学院管理") {
        window.open("addCollege.html");
    }
    else if (options.val() == "管理员管理") {
        window.open("addManagerForm.html");
    }
    else if (options.val() == "超级管理员管理") {
        window.open("addSupermanager.html");
    }
}
