<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Produtc;

class FrontendController extends Controller
{
    protected $produtcs;

    public function __construct(
        Produtc $produtcs
    ){
        $this->produtcs = $produtcs;
    }
    public function index(){
        $produtcs = $this->produtcs->all();
        return response()->json($produtcs, 200);
    }

    public function show($id){
        $produtc = $this->produtcs->find($id);
        return response()->json($produtc);
    }
}
