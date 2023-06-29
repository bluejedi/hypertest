//const { h } = require('hyperapp')

const Pagination = ({page, next, previous, loadAction, key}) => <ul class="pagination">
    <li class={`page-item ${previous?'':'disabled'}`}>
        <a onclick={() => loadAction(previous)} href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item">
        <a href="#">{page}</a>
    </li>
    <li class={`page-item ${next?'':'disabled'}`}>
        <a onclick={() => loadAction(next, key) } href={next}>Next</a>
    </li>
</ul>

export default Pagination
