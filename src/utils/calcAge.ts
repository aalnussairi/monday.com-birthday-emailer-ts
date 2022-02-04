export default (birthdate: string) => {
  const birth = new Date(
    parseInt(birthdate.slice(0, 4)),
    parseInt(birthdate.slice(5, 7)) - 1,
    parseInt(birthdate.slice(8, 10))
  );
  const ageDifMs = new Date().getTime() - birth.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return ordinal(age);
};

function ordinal(n: number) {
  var s = ['th', 'st', 'nd', 'rd'];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
