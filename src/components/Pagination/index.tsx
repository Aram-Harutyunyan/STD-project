import ReactPaginate from 'react-paginate'
import { fetchPosts } from '../../redux/slices/postsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

interface Props {
  count: number
  itemsPerPage: number
}

const Pagination = ({ count, itemsPerPage }: Props) => {
  const dispatch = useAppDispatch()
  const pagination =
    sessionStorage.getItem('pagination') &&
    Number(sessionStorage.getItem('pagination'))
  const pageCount = Math.ceil(count / itemsPerPage)

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = Math.ceil(event.selected * itemsPerPage)
    sessionStorage.setItem('pagination', String(event.selected))
    dispatch(
      fetchPosts(`/post/crud/?limit=${itemsPerPage}&offset=${newOffset}`),
    )
  }

  return (
    <ReactPaginate
      breakLabel="..."
      containerClassName="pagination flex gap-2 items-center justify-center"
      pageClassName="page-item px-1 rounded"
      activeClassName="active bg-ct--Blue"
      disabledClassName="disabled text-gray-500 pointer-events-none"
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      initialPage={pagination || 0}
    />
  )
}

export default Pagination
