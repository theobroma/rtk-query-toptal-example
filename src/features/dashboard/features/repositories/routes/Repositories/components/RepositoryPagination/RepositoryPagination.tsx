import TablePagination, {
  TablePaginationProps,
} from "@material-ui/core/TablePagination";
import React, { FC, useCallback, useMemo } from "react";
import { DEFAULT_ROWS_PER_PAGE } from "../../../../../../../../shared/constants/table";
import { useSearchRepositoriesState } from "../../hooks/useSearchRepositories";
import { useRepositorySearchFormContext } from "../../hooks/useRepositorySearchFormContext";
import { repositorySearchFormDefaultValues } from "../RepositorySearch/RepositorySearchFormContext";

export const repositoriesPerPage = [...DEFAULT_ROWS_PER_PAGE];

const RepositoryPagination: FC = () => {
  const { values, setFieldValue } = useRepositorySearchFormContext();
  const { data } = useSearchRepositoriesState();

  const handlePageChange: TablePaginationProps["onPageChange"] = useCallback(
    (e, page) => {
      setFieldValue("page", page + 1);
    },
    [setFieldValue]
  );

  const handlePerPageChange: TablePaginationProps["onRowsPerPageChange"] =
    useCallback(
      (e) => {
        setFieldValue("per_page", Number(e.target.value));
        setFieldValue("page", repositorySearchFormDefaultValues.page);
      },
      [setFieldValue]
    );
  return useMemo(
    () => (
      <TablePagination
        component="div"
        count={data?.response?.total_count || 0}
        page={values.page - 1}
        onPageChange={handlePageChange}
        rowsPerPage={values.per_page}
        onChangeRowsPerPage={handlePerPageChange}
        rowsPerPageOptions={repositoriesPerPage}
      />
    ),
    [data, values, handlePageChange, handlePerPageChange]
  );
};

export default RepositoryPagination;
