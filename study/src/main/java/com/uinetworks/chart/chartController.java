package com.uinetworks.chart;

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
public class chartController {
	@Autowired
	chartService service;
	
	@ResponseBody
	@RequestMapping(value = "/chart/getChartData.do",produces = "application/text; charset=utf-8")
	public String getChartData(Model model, HttpServletResponse res, HttpServletRequest req, HttpSession session, chartVo paramVo ) {
		JSONObject json = new JSONObject();
		
		List<chartVo> list = service.getChartData();
		
		json.put("result", list);
		
		return json.toString();		
		
	}
	
}
