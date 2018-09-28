<template>
    
    <div>

        <h1 v-text="title"></h1>

        <form class="form" @submit.prevent="updateProduct">

            <div class="form-group">

                <label for="name" class="label">Nome: </label>
                <input type="text" class="form-control" name="name" v-model="product.name"/>
                
                <div v-if="errorsMessages.name">   

                    <p class="error-msg" v-for="(error, index) in errorsMessages.name" :key="index" v-text="error"></p>
                    
                </div>

            </div>

            <div class="form-group">

                <label for="description" class="label">Descricao: </label>
                <textarea name="description" id="description" class="form-control" rows="10" v-model="product.description"></textarea>

                <div v-if="errorsMessages.description">   

                    <p class="error-msg" v-for="(error, index) in errorsMessages.description" :key="index" v-text="error"></p>
                    
                </div>

            </div>

            <loading-component :loading="loading"></loading-component>

            <button class="btn btn-success">Atualizar</button>

        </form>

    </div>

</template>

<script>

import LoadingComponent from "../Acessories/LoadingComponent"

export default {
    props : {

        id : {

            required : true,

        }

    },
    data () {

        return {

            title : "Criar Produto",
            product : {},
            errorsMessages : {},
            loading : false

        }

    },
    created () {

        this.getProduct();

    },
    methods : {

        getProduct(){

            this.loading = true

            this.$http.get("http://laravel55-webservice.localhost/api/v1/products/" + this.id).then(response => {

                this.product = response.body;

            },error => {

                if(error.status === 404) {

                    alert("Product Not Found");
                    this.$router.push('/product')

                }
                    
            }).finally(() => this.loading = false);

        },
        updateProduct(){

            this.loading = true

            this.$http.put("http://laravel55-webservice.localhost/api/v1/products/" + this.id, this.product).then(response => {
                this.$router.push("/product");
            },error => {

                if(error.status === 422) 
                    this.errorsMessages = error.body.errors;

            }).finally( () => this.loading = false );

        }

    },
    components : {

        LoadingComponent

    }

}
</script>

<style scoped>

.error-msg {

    color: red;

}

.error-msg input {

    border: 1px solid red;

}

</style>
