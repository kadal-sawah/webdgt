<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class AdminFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // if (session('token') && !session('level') == "1") return redirect()->to(ADMIN_PATH);
        if (session('token') && !session('level') == "1") echo json_encode([
            'status' => 'fail',
            'message' => 'Tidak memiliki Akses'
        ]);
        if (session('level') != '1') exit();
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
