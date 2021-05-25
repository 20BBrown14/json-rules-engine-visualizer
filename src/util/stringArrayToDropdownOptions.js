export default function stringArrayToDropdownOptions(array) {
  return array.map((item) => ({
    label: item,
    value: item,
  }));
}
