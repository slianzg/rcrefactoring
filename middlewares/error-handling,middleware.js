export default function (err, req, res, next) {
    console.error(err);

    res.status(500).json({message: '서버 내부에서 오류가 발생했습니다.'});
}