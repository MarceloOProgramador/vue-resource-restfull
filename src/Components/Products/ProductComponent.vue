<template>

    <div>

        <h1>{{title}}</h1>
        
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

        <ul class="pagination">

            <li v-if="(products.current_page - 1) >= 1"  class="page-item">

                <a href="#" class="page-link"> Prev </a>

            </li>

            <li class="page-item" v-if="(products.current_page + 1) < products.last_page">

                <a href="#" class="page-link"> Next </a>

            </li>

        </ul>

        <div v-if="loading">

            <figure>

                <img src="../../assets/loading.gif" alt="Loading image" class="loading">

            </figure>
            
        </div>

    </div>

</template>

<script>
export default {
    data () {
        return {
            title : "Produtos",
            products : {

                current_page : 1,
                last_page : 1,


            },
            loading: false
        }
    },

    created () {

        this.getproducts();

    },
    methods : {

        getproducts() {

            this.loading = true

            this.$http.get("http://laravel55-webservice.localhost/api/v1/products").then(response => {
                this.products = response.body;
            },error => {
                console.log(error);
            }).finally(() => this.loading = false)

        }

    }
}
</script>

<style scoped>

.loading {

    max-width: 70px;

}

</style>
