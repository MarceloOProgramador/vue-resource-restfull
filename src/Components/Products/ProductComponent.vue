<template>

    <div>

        <div class="row">

            <div class="col">

                <h1>{{title}}</h1>

            </div>

            <div class="col">

                <form @submit.prevent="searchProduct()" class="form-inline">

                    <input type="text" class="form-control" v-model="filter">
                    <button class="btn btn-default">Pesquisar</button>

                </form>

            </div>

        </div>

        <p>Total: {{products.total}}</p>

        <div class="row">
           <div class="col">

                <router-link to="product/create" class="btn btn-success btn-create">+ Criar</router-link>

           </div>
        </div>
        
        <table class="table">

            <thead>

                <tr>

                    <th>#id</th>

                    <th>Name</th>

                    <th>Description</th>

                    <th width="200">Actions</th>

                </tr>

            </thead>

            <tbody>

                <tr v-for="(product, index) in products.data" :key="index">

                    <td>{{product.id}}</td>

                    <td>{{product.name}}</td>

                    <td>{{product.description}}</td>

                    <td>

                        <router-link :to="{name : 'productEdit', params : {id : product.id}}" class="btn btn-info">Editar</router-link>

                        <a href="#" @click="deleteProduct(product.id)" class="btn btn-danger">Deletar</a>

                    </td>

                </tr>

            </tbody>

        </table>

        <loading-component :loading="loading"></loading-component>

        <pagination-component :pagination="products" :offset="offset" @paginate="pagination"></pagination-component>

        <!-- <ul class="pagination">

            <li v-show="products.current_page - 1 >= 1"  class="page-item">

                <a href="#" class="page-link" @click.prevent="pagination(products.current_page - 1)"> Prev </a>

            </li>

            <li v-show="products.current_page + 1 < products.last_page" class="page-item">

                <a href="#" class="page-link" @click.prevent="pagination(products.current_page + 1)"> Next </a>

            </li>

        </ul> -->

    </div>

</template>

<script>
import PaginationComponent from "../Acessories/PaginationComponent"
import LoadingComponent from "../Acessories/LoadingComponent"

export default {
    
    data () {
        return {
            title : "Produtos",
            products : {

                current_page : 1,
                last_page : 1

            },
            loading: false,
            offset : 4,
            filter : ""

        }
    },
    created () {

        this.getProducts();

    },
    methods : {

        getProducts() {

            this.loading = true

            this.$http.get("http://laravel55-webservice.localhost/api/v1/products?page="+this.products.current_page+"&filter="+this.filter).then(response => {
                this.products = response.body;
            },error => {
                console.log(error);
            }).finally(() => this.loading = false)

        },
        pagination(n){

            this.products.current_page = n;
            this.getProducts();

        },
        deleteProduct(p){

            this.loading = true;

            if( confirm("Deseja mesmo excluir este produto?")){

                this.$http.delete(`http://laravel55-webservice.localhost/api/v1/products/${p}`).then( response => {
                
                    this.getProducts();

                }, error => {
                    console.log(error)
                }).finally( () => this.loading = false); 

            }

        },
        searchProduct(){

            this.getProducts();
            
        }
    },
    components : {
        PaginationComponent,
        LoadingComponent
    }
}
</script>

<style scoped>

.btn-create {

    margin:  15px 0px;

}

</style>
