package com.uinetworks.map;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.uinetworks.chart.chartVo;

import net.sf.json.JSONObject;


/*
* 작성자 : 전재현
* 작성일자 : 2020. 10. 13.
* 버전 : 0.0.1
* 라이센스 : 
* 
* 차트 데이터 서버단 제작
* Copyright 2020. (주)유아이네트웍스. All rights reserved.
*/



/**
 * @author user
 * @since 
 */
@Controller
public class mapController {
	@Autowired
	mapService service;
	
	@ResponseBody
	@RequestMapping(value = "/map/getclickMapSearchPoint.do",produces = "application/text; charset=utf-8")
	public String getclickMapSearchPoint(Model model, HttpServletResponse res, HttpServletRequest req, HttpSession session, chartVo paramVo ) {
		JSONObject json = new JSONObject();
		
		String coordinate = req.getParameter("coordinate");
		System.out.println(coordinate);
		
		String[] splitCoordinate = coordinate.split(",");
		String x = splitCoordinate[0];
		String y = splitCoordinate[1].trim();
		
		System.out.println(x + " / " + y);
		
		chartVo vo = new chartVo();
		vo.setX(x);
		vo.setY(y);
		List<chartVo> list = service.getclickMapSearchPoint(vo);
//		
		json.put("result", list);
		
		return json.toString();		
		
	}
	
}
