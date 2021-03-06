$(document).ready(function () {
    $('#xxxName').html(name);

    //管理页面下，点击按钮跳转相应页面

    //删除个人信息
    $('#delSuperManager').click(function () {
        $.ajax({
            //请求方式
            type: 'DELETE',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/superManager/self" ,
            //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //服务器返回的数据类型
            dataType: 'json',
            success:function(data) {
                //请求成功函数内容
                alert('删除成功！');
                console.log(data.result);
                //self.location.href = '../login.html';
            },
            error:function(){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });

    //修改个人信息
    $('.change_info').click(function () {
        $('div.all_info').load("changeInfo.html");
    });
    $('#superManagerInfo_roll').click(function (){
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
             url: 'http://39.108.57.12:8080/CourseSystem/superManager/self' ,
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //数据
            data: JSON.stringify({  //解决错误码400
                'supName' :       $('#supName').val(),
                'sex' :           $('#sex').val(),
                'phone' :       $('#phone').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType : 'json',
            success:function(response) {
                //请求成功函数内容
                console.log(response.result);
                if(response.result == 'success'){
                    alert('保存成功!');
                    $('div.all_info').load("changeInfo.html");
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });

    //学院管理
    //查询所有班级信息
    $('#manageCollege').click(function () {
        $('div.all_info').load("manage_college.html");
    });
    $('#allClass_info').click(function () {
        $('div.all_info').load("collegeRollList.html");
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
                        + "<a onclick='delClass(this,"+ n.claId + ")'>删除</a> </td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询个别班级信息
    $('#checkedClass').click(function () {
        $('div.all_info').load("collegeRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?claId=' + $('#claId').val() + '&graName=' + $('#graName').val()+ '&acaName=' + $('#acaName').val()+ '&proName=' + $('#proName').val() ,
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
                        +"<td>" + n.claName + "</td>" + "<td>"+ n.createDate + "</td><td>"
                        + "<a onclick='delClass(this,"+ n.claId + ")'>删除</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
/*
    //添加班级信息
    $('#logClass').click(function () {
        $('div.all_info').load("collegeRollForm.html");
    });
    $('#classInfo_roll').click(function () {
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
            success:function(response) {
                //请求成功函数内容
                if(response.result == 'success'){
                    alert('录入成功!');
                    $('div.all_info').load("collegeRollForm.html");
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });
*/


    //管理员管理
    //查询所有管理员信息
    $('#manageTeacher').click(function () {
        $('div.all_info').load("manage_teacher.html");
    });
    $('#allTeacher_info').click(function () {
        $('div.all_info').load("teacherRollList.html");
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
                        + "<a onclick='delManager(this,"+ n.manId + ")'>删除</a> <a target='_parent' onclick='editManager(" + n.manId + ")'>修改</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询个别管理员信息
    $('#checkedTeacher').click(function () {
        $('div.all_info').load("teacherRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + $('#manId').val() + '&manName=' + $('#manName').val() ,
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
                        + "<a onclick='delManager(this,"+ n.manId + ")'>删除</a> <a target='_parent' onclick='editManager(" + n.manId + ")'>修改</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //添加管理员信息
    $('#logTeacher_info').click(function () {
        $('div.all_info').load("teacherRollForm.html");
    });
    $('#teacherInfo_roll').click(function () {
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
            success:function(response) {
                //请求成功函数内容
                if(response.result == 'success'){
                    alert('录入成功!');
                    $('div.all_info').load("teacherRollForm.html");
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });


    //超级管理员管理
    //查询所有超级管理员信息
    $('#manager').click(function () {
        $('div.all_info').load("manage_manager.html");
    });
    $('#allManager_info').click(function () {
        $('div.all_info').load("managerRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/self'  ,
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
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        +"<td>" + n.phone + "</td>" + "<td>"+ n.createBy + "</td>" + "<td>"+ n.createDate + "</td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error : function(){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询个别超级管理员信息
    $('#checkedManager').click(function () {
        $('div.all_info').load("managerRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            //url: 'http://192.168.137.1:8080/CourseSystem/superManager/selves?supId=' + $('#supId').val() + '&supName=' + $('#supName').val() ,
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
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
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        +"<td>" + n.phone + "</td>" + "<td>"+ n.createBy + "</td>" + "<td>"+ n.createDate + "</td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('查询失败!!');
            }
        });
    });
    //添加超级管理员信息
    $('#logManager_info').click(function () {
        $('div.all_info').load("managerRollForm.html");
    });
    $('#managerInfo_roll').click(function () {
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
            //url: 'http://192.168.137.1:8080/CourseSystem/superManager/self',
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //数据
            data: {
                "supName" :   $('#supName').val(),
                "sex" :       $('#sex').val(),
                "phone" :     $('#phone').val()
            },
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType : 'json',
            success:function(data) {
                //请求成功函数内容
                if(data.result == 'success'){
                    alert('录入成功!');
                    $('div.all_info').load("managerRollForm.html");
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });

    //修改管理员信息
    $('#changeManagerInfo').click(function () {
        editManager1(managerId);
    });

});


var managerId;
//删除管理员
function delManager(i,manId){
    alert("是否删除该管理员?");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + manId  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//删除班级
function delClass(i,claId) {
    alert("是否删除该班级?");
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
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//修改管理员
function editManager(manId){
    managerId = manId;
    $('div.all_info').load("changeManagerInfo.html");
}
function editManager1(manId){
    alert(manId);
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
}


