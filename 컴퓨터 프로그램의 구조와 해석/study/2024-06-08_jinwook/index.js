const {
  pair,
  head,
  tail,
  display_stream,
  interleave,
  stream_map_2,
  stream_ref,
  stream_map,
  stream_tail,
  is_null,
  memo,
  list,
  take,
  pairs,
  display,
  append,
  stream_filter,
  add_streams,
  scale_stream,
} = require("../../lib/jinwook");

function add_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

function scale_streams(s, n) {
  const scale_stream = pair(n, () => scale_stream);
  return mul_streams(s, scale_stream);
}

function integral(integrand, inital_value, dt) {
  const integ = pair(inital_value, () =>
    add_streams(scale_stream(integrand, dt), integ)
  );
  return integ;
}

// 3.73
function RC(R, C, dt) {
  return (i, v_0) => {
    return add_streams(
      scale_stream(i, R),
      integral(scale_stream(1, 1 / C), v_0, dt)
    );
  };
}

// 3.74
const zero_crossings = stream_map_2(
  sign_change_detector,
  sense_data,
  stream_tail(sense_data)
);

// 3.75
// 평균이 2번 중첩되었다.
function make_zero_crossings(input_stream, last_value, last_avpt) {
  const avpt = (head(input_stream) + last_value) / 2;
  return pair(sign_change_detector(avpt, last_avpt), () =>
    make_zero_crossings(stream_tail(input_stream), head(input_stream), avpt)
  );
}

// 3.76
function smooth(s) {
  return stream_map_2((a, b) => a + b / 2, s, stream_tail(s));
}

const zero_crossings_smooth = stream_map_2(
  sign_change_detector,
  smooth(sense_data),
  stream_tail(smooth(sense_data))
);

// 3.77
function integral(delayed_integrand, inital_value, dt) {
  const integrand = delayed_integrand();

  return pair(
    inital_value,
    is_null(integrand)
      ? null
      : integral(
          () => stream_tail(integrand),
          dt * head(integrand) + inital_value,
          dt
        )
  );
}

function solve(f, y0, dt) {
  const y = integral(() => dy, y0, dt);
  const dy = stream_map(f, y);
  return y;
}

// 3.78
function solve_2nd(y0, dy0, dt, a, b) {
  const y = integral(() => dy, y0, dt);
  const dy = integral(() => ddy, dy0, dt);
  const ddy = add_streams(scale_stream(a, dy), scale_stream(b, y));
  return y;
}

// 3.79
function solve_2nd_general(f, y0, dy0, dt) {
  const y = integral(() => dy, y0, dt);
  const dy = integral(() => ddy, dy0, dt);
  const ddy = stream_map_2(f, dy, y);
  return y;
}

// 3.80
function RLC(R, L, dt) {
  return (vC_0, iL_0) => {
    const v_C = integral(() => dv_C, vC_0, dt);
    const dv_C = scale_stream(-1 / C, i_L);
    const i_L = integral(() => di_L, iL_0, dt);
    const di_L = add_streams(
      scale_stream(1 / L, v_C),
      scale_stream(-R / L, i_L)
    );
    return pairs(v_C, i_L);
  };
}

// 3.81
function rand() {
  return 20;
}

// 1. (generate null) (reset 30)
// 2. (generate,30,reset, generate,30, generate, 50, reset)

// 1. input_stream이 정제되었다는 가정 (reset 뒤에는 무조건 숫자가 나온다)
// 2. input_stream이 정제가 안되었다는 가정

// (2,1) 형태로 가정한 정답 코드
function make_rand(input_stream) {
  return head(input_stream) === "generate"
    ? pair(rand(), () => make_rand(stream_tail(input_stream)))
    : pair(
        head(stream_tail(input_stream)),
        make_rand(stream_tail(stream_tail(input_stream)))
      );
}

// 3.82
function rectangle_area(x1, x2, y1, y2) {
  return (x2 - x1) * (y2 - y1);
}

function estimate_integral(p, x1, x2, y1, y2, trials) {
  const guess = monte_carlo(
    trials,
    p(random_in_range(x1, x2), random_in_range(y1, y2))
  );

  return guess * rectangle_area(x1, x2, y1, y2);
}


# 날짜 폴더들을 순회하며 jinwook 폴더를 복사 또는 압축
for date_folder in */; do
    if [ -d "${date_folder}jinwook" ]; then
        echo "Processing ${date_folder}jinwook"

        
        DESTINATION="../hello/${date_folder%/}_jinwook"

        if [ ! -d "$(dirname "$DESTINATION")" ]; then
            sudo mkdir -p "$(dirname "$DESTINATION")"
            echo "Created parent directory: $(dirname "$DESTINATION")"
        fi

        sudo mkdir -p "$DESTINATION"
        echo "Created destination directory: $DESTINATION"

        sudo cp -r "${date_folder}jinwook/." "$DESTINATION"
    fi
done
