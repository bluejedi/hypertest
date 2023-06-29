//const { h } = require('hyperapp')

const Pagination = ({page, next, previous, loadAction, key}) => <ul class="pagination">
    <li class={`page-item ${previous?'':'disabled'}`}>
        <a onclick={() => loadAction(windows.g_urls[key] + prev)} href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item">
        <a href="#">{page}</a>
    </li>
    <li class={`page-item ${next?'':'disabled'}`}>
        <a onclick={() => loadAction(window.g_urls[key] + next, key) } href={window.g_urls[key] + next}>Next</a>
    </li>
</ul>

export default Pagination
