# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 17:32:05. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (8261 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- Gera o QR code do Pix a partir do copia e cola -->
24: <!-- Supabase (banco de dados online) -->
140: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
145: <!-- Header Principal -->
159: <!-- Controles do Header -->
161: <!-- Botão Status Online/Offline (Motorista) -->
169: <!-- Ativar Notificações -->
174: <!-- Temas -->
179: <!-- Logout Button -->
188: <!-- Conteúdo Principal -->
191: <!-- TELA DE LOGIN -->
192: #secLogin
225: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
226: #secDemoEscolha
241: <!-- PAINEL DO MOTORISTA -->
242: #secDriverPanel
244: <!-- Card do Veículo Vinculado -->
258: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
268: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
273: <!-- Aviso: nova versão do app Android -->
276: <!-- Aviso vermelho: notificações desligadas -->
279: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
283: <!-- Aviso de Pix / pagamento pendente -->
286: <!-- Navegação de Abas -->
304: <!-- Conteúdo das Abas Motorista -->
307: <!-- Aba CRLV-e -->
308: #tabDrvCrlv
313: <!-- Renderizado dinamicamente -->
317: <!-- Aba Contrato -->
318: #tabDrvContract
328: <!-- Renderizado dinamicamente -->
332: <!-- Aba Vistoria -->
333: #tabDrvInspection
340: <!-- Aba Pagamento -->
341: #tabDrvPayment
354: <!-- Caução e multas do motorista -->
356: <!-- Valor e descrição da cobrança -->
366: <!-- Seção Pix -->
380: <!-- QR Code Renderizado aqui -->
413: <!-- Seção Upload de Comprovante -->
430: <!-- Lista de comprovantes -->
435: <!-- Recibos quando o contrato está encerrado -->
442: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
443: #secMasterPanel
477: <!-- Aviso: falta criar a tabela dos termos no banco -->
480: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
482: <!-- Lista de Veículos -->
498: <!-- Renderizado via JS -->
505: <!-- Form de Adicionar Veículo -->
539: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
545: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
550: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
555: <!-- Fichas Arquivadas (após marcar caução pago) -->
564: <!-- Form de Adicionar Motorista -->
659: <!-- Barra de baixo do dono (só no design novo) -->
669: <!-- MODAL PRIMEIRO LOGIN -->
670: #modalFirstLogin
704: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
705: #modalNotif
718: <!-- MODAL VISTORIA (MASTER) -->
719: #modalInspection
732: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
733: #modalSettings
792: <!-- MODAL TEMAS -->
793: #modalThemes
804: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
805: #modalCreds
820: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
835: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
836: #modalDriverFile
876: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
905: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
920: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
962: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
963: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
964: #modalRecibo
983: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
984: #modalPixArea
1000: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1001: #modalIA
1083: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1084: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1085: #modalEditVeh
1104: #modalSenha
1126: #modalMeusRecibos
1144: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1145: #modalEmail
1165: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1166: #modalReport
1181: #modalFinCardDetail
1194: #modalFinance
1247: <!-- FILTROS -->
1296: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1316: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1317: #modalExpenses
1352: <!-- MODAL NOVO PIX -->
1353: #modalNewPix
1405: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1463: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1464: #modalCorrigirRecibo
1478: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1479: #modalDocViewer
1487: #modalDocBody
1488: <!-- Conteúdo pré-visualizado -->
1494: #modalTerms
1508: <!-- NOTIFICAÇÕES TOAST -->
1525: lsGet()
1526: lsSet()
1527: lsDel()
1550: demoLoginRole()
1554: demoId()
1555: demoSave()
1556: demoSaved()
1558: *datas no horário de Brasília*
1559: demoLocal()
1560: demoParts()
1561: demoDay()
1562: demoNextDue()
1567: *dados fictícios (4 meses)*
1568: demoBuild()
1711: *documentos fictícios (imagem gerada na hora)*
1712: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1713: demoDocBlob()
1791: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1792: demoQuery()
1815: out()
1821: run()
1862: demoOnUpdate()
1872: demoOnInsert()
1973: demoClient()
2038: demoStart()
2046: demoStop()
2052: abrirDemo()
2059: trocarDemo()
2064: demoBanner()
2079: toEmail()
2083: showLogin()
2087: esc()
2092: dataHoraBR()
2100: uiDialogo()
2148: uiConfirm()
2157: uiPrompt()
2163: friendlyError()
2173: devicePrefs()
2176: saveDevicePrefs()
2179: docRef()
2180: viewDocIdx()
2182: setBusy()
2220: **TEMAS**
2229: currentTheme()
2234: applyTheme()
2235: openThemes()
2245: pickTheme()
2251: toggleDarkMode()
2253: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2255: loadDesignCfg()
2262: applyDesign()
2279: markMasterNav()
2284: fillDesignCfg()
2289: saveDesign()
2303: showToast()
2312: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2313: senhaErro()
2314: abrirSenha()
2323: salvarIaCodigo()
2333: fecharSenha()
2334: salvarSenha()
2355: loginUserInput()
2360: loginErro()
2364: verSenha()
2369: handleLogin()
2418: logout()
2437: saveFirstLoginPreferences()
2460: carregarDados()
2483: aplicarDados()
2506: loadAndRender()
2533: autoRefresh()
2572: markUpdated()
2577: reload()
2582: renderApp()
2630: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2633: masterBack()
2635: viewAsDriver()
2657: exitViewAs()
2676: viewOnly()
2677: renderViewAsBanner()
2687: showSection()
2692: withBtn()
2700: toggleDriverStatus()
2709: isOnline()
2711: updateStatusToggleUI()
2724: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2733: checkApkUpdate()
2748: updateInstallApkButton()
2768: renderDriverPanel()
2993: switchDriverTab()
3008: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3011: parsePixKey()
3015: normalizePixKey()
3023: pixKeyLooksOk()
3031: togglePixKeyFields()
3037: updatePixKeyPlaceholder()
3043: copyPixKey()
3050: copyPixCode()
3062: receiptBadge()
3072: receiptMasterBox()
3099: receiptAction()
3106: confirmReceipt()
3119: rejectReceipt()
3131: recheckReceipt()
3140: uploadReceipt()
3163: switchMasterTab()
3180: maskPhone()
3189: waLink()
3194: allVeh()
3195: allDrv()
3196: chargeVehicleId()
3208: enviarPedidoParcialAsaas()
3224: pedirPixParcial()
3242: restaurarPixTotal()
3248: responderPixParcial()
3272: contrato30Info()
3302: encerrarContrato()
3319: encerrarContratoPrompt()
3332: reativarContrato()
3356: marcarCaucaoPagoArquivar()
3377: desarquivarFicha()
3395: deliveryInspectionHtml()
3425: uploadDeliveryPhotos()
3452: delDeliveryPhoto()
3470: addCauDesconto()
3495: puxarMultaCaucao()
3516: delCauDesconto()
3538: dfCauDescontosHtml()
3571: dfContratoRender()
3615: encerrarContratoConfirmFicha()
3622: renderMasterPanel()
3765: renderArchivedDrivers()
3810: handleAddVehicle()
3843: deleteVehicle()
3844: cancelDeleteVehicle()
3846: confirmDeleteVehicle()
3870: abrirEditarVeiculo()
3889: fecharEditarVeiculo()
3890: salvarEditarVeiculo()
3920: drvCauMostra()
3927: drvCauLer()
3935: handleAddDriver()
4013: marcarSituacao()
4023: updateDriverPaymentStatus()
4032: deleteDriver()
4033: cancelDeleteDriver()
4035: confirmDeleteDriver()
4058: prepareFile()
4080: uploadFile()
4091: fileUrl()
4102: downloadName()
4106: renderFilePreview()
4126: renderPdfToCanvas()
4153: viewDoc()
4174: **DINHEIRO**
4175: parseMoney()
4182: fmtMoney()
4183: fmtDate()
4184: todayISO()
4186: **CONFIGURAÇÕES (Gemini e Google Drive)**
4188: loadConfigStatus()
4193: paintConfig()
4198: openSettings()
4208: closeSettings()
4209: saveConfig()
4219: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
4220: loadAsaasInfo()
4233: saveAsaas()
4241: testarAsaas()
4248: copiarAsaas()
4252: testDrive()
4259: resyncDrive()
4267: **FICHA DO MOTORISTA**
4270: openDriverFile()
4300: closeDriverFile()
4302: saveDriverFile()
4352: aiFillDriver()
4391: **CONTROLE FINANCEIRO**
4392: finRange()
4409: dayBR()
4410: inRange()
4412: onFinPeriodChange()
4418: fillFinFilters()
4426: clearFinFilters()
4430: updateFinFilterCount()
4439: openFinance()
4444: switchFinTab()
4455: finCardBtn()
4463: closeFinCardDetail()
4464: closeFinance()
4466: renderFinance()
4564: openFinCardDetail()
4771: renderFinGrafico()
4791: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
4793: okEmail()
4795: openEmailCompose()
4816: closeEmailCompose()
4817: sendEmailCompose()
4832: emailRecibo()
4837: emailIA()
4845: **RELATÓRIO DO FINANCEIRO**
4847: finFiltersText()
4852: finPeriodText()
4859: buildReportHtml()
4881: openFinReport()
4891: closeFinReport()
4892: printFinReport()
4896: shareFinReport()
4906: emailFinReport()
4912: **DESPESAS DO VEÍCULO**
4914: openExpenses()
4926: closeExpenses()
4927: fillExpenseTypes()
4932: createExpenseType()
4947: aiReadExpense()
4979: renderExpenses()
5001: saveExpense()
5028: deleteExpense()
5053: photoCard()
5082: inspectionHtml()
5108: hydrateImages()
5114: openInspection()
5122: closeInspection()
5126: renderInspectionModal()
5133: uploadInspection()
5164: deleteInspectionPhoto()
5184: fmtDue()
5190: nextDueLocal()
5201: openNewPix()
5231: **CAUÇÃO DO MOTORISTA**
5232: cauOf()
5233: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
5234: devOf()
5235: devCobrancas()
5237: devPrevisao()
5245: dfDevRender()
5272: dfDevIr()
5273: dfDevSalvar()
5278: dfDevAvisar()
5284: dfDevDesfazer()
5288: dfDevReceber()
5297: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
5301: cauPlano()
5309: cauParcela()
5316: cauParcelasTexto()
5320: cauNext()
5327: dfCauFill()
5337: dfCauCalc()
5365: dfCauRead()
5378: **CAUÇÃO: quanto já foi pago**
5380: cauStatus()
5390: obsResumoHtml()
5391: cauResumoHtml()
5396: **MULTAS E OUTRAS DESPESAS**
5397: multasOf()
5399: multaPagaAuto()
5404: multasAbertas()
5405: multasPendentes()
5406: multasResumoHtml()
5414: cobOf()
5415: dfCobFill()
5421: dfCobRead()
5424: dfCobInfo()
5434: cobResumoHtml()
5438: ajustesOf()
5442: ajusteVale()
5443: isoDia()
5445: vencProxima()
5446: previsaoProxima()
5460: previsaoHtml()
5464: dfAjRender()
5470: addAjuste()
5479: delAjuste()
5484: abrirAjustes()
5485: renderProxCobrancas()
5491: savePixExtra()
5499: dfMultFill()
5507: fdPaga()
5508: dfMultRender()
5517: toggleMultas()
5524: addMulta()
5534: delMulta()
5542: multaPaga()
5551: renderDriverExtras()
5579: mondayAfter()
5587: renderDriverProfileExtras()
5653: semanaDoPix()
5659: **MEUS RECIBOS (área do motorista)**
5661: meusRecibosLista()
5665: reciboRowHtml()
5673: renderEncerradoRecibos()
5678: openMeuReciboDireto()
5679: openMeusRecibos()
5686: closeMeusRecibos()
5687: reciboPdfHtml()
5698: verMeuRecibo()
5705: voltarMeusRecibos()
5706: pdfMeuRecibo()
5710: shareMeuRecibo()
5719: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
5720: editVehicleRent()
5737: nextParcel()
5743: fillNewPixValues()
5779: newPixParts()
5810: **PERÍODO E VENCIMENTO DA COBRANÇA**
5811: dataISO()
5812: dataDe()
5813: dataMais()
5814: dataBR()
5815: diasEntre()
5816: isoSP()
5817: pixPeriodo()
5824: pixDesc()
5825: pixDiasPeriodo()
5830: marcarAjustesPorVenc()
5835: pixDatasNovo()
5844: pixDatasMudou()
5855: pixAluguelProporcional()
5863: pixPeriodoInfo()
5876: pixAddLinha()
5883: pixLinhas()
5885: descSoma()
5895: calcNewPix()
5904: **RECIBO DE PAGAMENTO**
5908: receiptValue()
5909: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
5910: atrasoDados()
5917: cobrarAtraso()
5933: allocatePix()
5952: reciboData()
5975: fmtDateTimeBR()
5976: reciboTexto()
6027: openRecibo()
6044: closeRecibo()
6045: **CORRIGIR RECIBO**
6047: corrigirLinhaHtml()
6057: openCorrigirRecibo()
6080: closeCorrigirRecibo()
6081: corrigirLer()
6087: corrigirSoma()
6094: salvarCorrigirRecibo()
6111: copyRecibo()
6116: reciboCanvas()
6133: reciboPdfBlob()
6151: shareReciboPdf()
6167: rotularTabelas()
6185: areaAberta()
6186: markAreas()
6196: closeAreas()
6200: toggleArea()
6208: dobraSalva()
6209: setDobra()
6214: toggleDobra()
6221: dobraTopo()
6228: renderMasterResumo()
6242: renderMasterTopo()
6264: loadIA()
6286: updateIABadge()
6291: loadIASetting()
6297: paintIASwitch()
6303: toggleIA()
6310: loadRobo()
6319: iaPrepararQr()
6324: paintRobo()
6353: pedirCodigoRobo()
6362: toggleRobo()
6377: iaTodosGerar()
6395: iaTodosCancelar()
6399: iaTodosConfirmar()
6413: loadIARules()
6418: iaAbrirPdf()
6424: renderIARules()
6428: saveIARules()
6433: addIARule()
6438: delIARule()
6442: openIA()
6457: closeIA()
6458: iaShow()
6459: iaPhone()
6464: renderIA()
6506: iaAprovar()
6515: iaPhone2()
6516: iaSend()
6547: iaMark()
6558: iaDelete()
6569: openPixArea()
6578: closePixArea()
6579: renderPixArea()
6615: openEditPix()
6644: deletePix()
6656: closeNewPix()
6658: saveNewPix()
6749: pushSupported()
6750: isIOS()
6751: isStandalone()
6752: b64ToBytes()
6758: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
6763: notifStatus()
6771: stepsList()
6775: notifHelpHtml()
6809: renderNotifModal()
6821: checkDriverNotifications()
6854: activateFromModal()
6867: refreshNotifButton()
6886: subscribePush()
6901: enableNotifications()
6921: closeDocViewer()
6929: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
6941: allFeaturesOn()
6942: feat()
6943: loadDriverFeatures()
6950: saveDriverFeatures()
6954: drawFeatureToggles()
6969: setAllFeatures()
6980: applyDriverFeatures()
6995: **PIX: conferência do código e QR code desenhado no aparelho**
6996: crc16()
7004: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
7006: pixTxt()
7007: pixCampo()
7008: pixGerarCodigo()
7018: pixAutoLigado()
7019: pixAutoMudou()
7024: gerarPixAuto()
7040: pixRecebedorCarregar()
7051: pixRecebedorGuardar()
7058: pixValid()
7064: renderPixQr()
7074: previewNewPixQr()
7084: **FOTO DO MOTORISTA (recortada da CNH)**
7085: photoPath()
7086: fileToCanvas()
7105: cropPhoto()
7119: savePhoto()
7124: photoBoxFrom()
7130: fillAvatar()
7141: fillAvatars()
7154: storedFile()
7161: photoFromCnh()
7173: **FOTO DO PERFIL ACOMPANHA A CNH**
7176: cnhStamp()
7177: photoFiles()
7185: avatarPath()
7190: syncCnhPhotos()
7214: pickImage()
7217: changeDriverPhoto()
7233: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
7235: uploadTmp()
7242: clearTmp()
7247: aiReadFiles()
7253: okDateISO()
7255: noAccents()
7257: makeUsername()
7266: titleCase()
7267: syncNewDriverAccess()
7273: setNewDriverPhoto()
7278: pickNewDriverPhoto()
7282: resetNewDriverForm()
7290: newDriverDocChosen()
7324: anoCrlv()
7325: aiReadCrlv()
7342: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
7343: sendWelcomeEmail()
7349: showCredentials()
7360: demoAssistente()
7379: **PERGUNTAR À IA (ÁREA IA, só o master)**
7383: iaChatReset()
7384: iaNorm()
7385: iaAcha()
7391: iaVeicTxt()
7392: iaCamposVeic()
7393: iaDataOk()
7394: iaOpcoes()
7395: iaTodosMotoristas()
7399: iaFerramenta()
7488: renderIAChat()
7505: iaChatDica()
7506: iaChatEnviar()
7541: iaChatNota()
7542: iaCancelarCartao()
7543: iaConfirmarCartao()
7586: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
7587: renderAppEarnings()
7652: saveAppEarning()
7677: workDayISO()
7678: paintDayOff()
7687: renderDayOff()
7694: setDayOff()
7704: aiReadEarning()
7737: **DESPESAS DO APLICATIVO**
7739: appExpCustomTypes()
7740: fillAppExpTypes()
7747: onAppExpTypeChange()
7752: saveAppExpense()
7776: deleteAppExpense()
7785: deleteAppEarning()
7882: loadTermsAcceptances()
7894: termsOf()
7895: currentAcceptance()
7896: needsTermsAcceptance()
7899: fmtDateTime()
7902: termsPlainText()
7906: termsHash()
7914: openTermsGate()
7937: termsGateCheck()
7945: acceptTerms()
7965: acceptanceHtml()
7976: openTermsViewer()
7994: closeTerms()
8000: downloadTermsCopy()
8021: termsBadgeMaster()
8028: termsMasterDetail()
8069: renderTermsSetupBanner()
8082: copyTermsSql()
8092: cnhExpired()
8093: cnhWaiting()
8094: onlyDigits()
8095: normName()
8097: verifyCnh()
8109: renderCnhBanner()
8127: sendNewCnh()
8175: cnhBadgeMaster()
8183: applyPendingCnh()
8191: autoReadNewCnhs()
8209: cnhPendingHtml()
8223: recheckPendingCnh()
8233: rejectPendingCnh()
8243: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (518 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
81: cauParcela()
90: ajusteVale()
93: tirarAjustes()
99: cobrarMotorista()
112: *valores (mesma regra do Novo Pix)*
140: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
143: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
164: r2()
166: criarQrAsaasEUpload()
189: saldoAbertoMotorista()
228: salvarQrParcialNoPerfil()
239: cobrarTodos()
259: *pagamento recebido*
260: quemPagou()
283: pagamentoRecebido()
349: usuarioAuth()
358: ehMaster()
363: pixParcialMotorista()
422: autorizarParcial()
463: preparar()
464: limpa()
499: acao "pix_parcial"
502: acao "autorizar_parcial"
507: acao "preparar"
511: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (310 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
122: emAberto()
134: avisoAtraso()
152: **4) PIX AUTOMÁTICO DO MOTORA**
154: crc16()
159: campo()
160: txtPix()
161: codigoPix()
168: chaveNormal()
175: proximaParcela()
183: pixAutomatico()
190: *valores (mesma regra do Novo Pix e do Asaas)*
217: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
238: pixAutoTodos()
262: enviar()
271: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (442 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
