const isLoading = ref(false);
export function useAxios() {
  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  return {
    isLoading,
    setLoading,
  };
}
