<template>

    <div>

        <h1>{{title}}</h1>

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

                        <a href="#" class="btn btn-info">editar</a>

                        <a href="#" class="btn btn-danger">Deletar</a>

                    </td>

                </tr>

            </tbody>

        </table>

        <div v-if="loading">

            <figure>

                <img src="../../assets/loading.gif" alt="Loading image" class="loading">

            </figure>
            
        </div>

        <pagination-component :pagination="products" :offset="offset" @paginate="getProducts"></pagination-component>

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

export default {
    
    data () {
        return {
            title : "Produtos",
            products : {

                current_page : 1,
                last_page : 1

            },
            loading: false,
            offset : 4

        }
    },
    created () {

        this.getProducts();

    },
    methods : {

        getProducts() {

            this.loading = true

            this.$http.get("http://laravel55-webservice.localhost/api/v1/products?page="+this.products.current_page).then(response => {
                this.products = response.body;
            },error => {
                console.log(error);
            }).finally(() => this.loading = false)

        },
        pagination(n){

            this.products.current_page = n;
            this.getProducts();

        }
    },
    components : {
        PaginationComponent
    }
}
</script>

<style scoped>

.loading {

    max-width: 70px;

}

.btn-create {

    margin:  15px 0px;

}

</style>
