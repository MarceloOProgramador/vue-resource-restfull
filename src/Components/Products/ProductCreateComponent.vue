<template>
    
    <div>

        <h1 v-text="title"></h1>

        <form class="form" @submit.prevent="createProduct">

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

            <button class="btn btn-success">Cadastrar</button>

        </form>

    </div>

</template>

<script>
export default {

    data () {

        return {

            title : "Criar Produto",
            product : {},
            errorsMessages : {}

        }

    },
    methods : {

        createProduct(){

            this.$http.post("http://laravel55-webservice.localhost/api/v1/products", this.product).then(response => {

                // console.log(response);
                this.$router.push('/product');

            },error => {

                if(error.status === 422) 
                    this.errorsMessages = error.body.errors;

            }).finally(() => console.log("Produto Cadastrado com sucesso!"));

        }

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
