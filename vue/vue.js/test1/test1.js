var data = {a: 1, b: 9};

// Object.freeze(data);

var vm = new Vue({
    el: '#app',
    data: data ,
    beforeCreate: function() {
         // this 指向vm
         console.log(this);
         // 实例初始化了，但是数据未绑定
         console.log('beforeCreate and a is' + this.a);
    },
    created: function () {
        // 在实例创建完成后被立即调用,实例完成了 data property的配置
        // this 指向vm
        console.log('created and a is' + this.a);
    },
    beforeMount: function () {
        console.log('beforeMount and a is' + this.a);
    },
    mounted: function() {
        // 实例被挂载后调用-> 挂载到 el元素上
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
            console.log('nextTick');
        })
        // el元素 被新创建的vm.$el所替换 , $el是 Vue 实例使用的根 DOM 元素。
        console.log('mounted and a is' + this.a);
       
    }

    

});

vm.$watch('a', function(newValue, oldValue){
    // a 发生改变成会调用
    console.log('watch function');
    console.log(newValue, oldValue);
});




