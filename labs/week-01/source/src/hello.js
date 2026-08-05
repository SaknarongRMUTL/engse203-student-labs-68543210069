const student = {
  name: "ศักดิ์ณรงค์ นำนนท์",
  studentId: "ุ68543210069-9",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));