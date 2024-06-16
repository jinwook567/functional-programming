function or_gate(o1, o2, output) {
  function or_action_function() {
    const new_value = logical_or(get_signal(o1), get_signal(o2));
    after_delay(or_gate_delay, () => set_signal(output, new_value));
  }

  add_action(o1, or_action_function);
  add_action(o2, or_action_function);
  return "ok";
}

function inverter(i, o) {}

function or_gate(o1, o2, output) {
  const wire_1 = make_wire();
  const wire_2 = make_wire();
  const wire_3 = make_wire();

  inverter(o1, wire_1);
  inverter(o2, wire_2);
  and_gate(wire_1, wire_2, wire_3);
  inverter(wire_3, output);

  return "ok";
}

function ripple_carry_adder(seq_a, seq_b, seq_s, c) {
  // c를 계속 바꾸면서 처리한다.
  if (is_null(seq_a)) return c;
}
